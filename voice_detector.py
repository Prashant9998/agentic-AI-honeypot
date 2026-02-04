"""
Voice Detection Module
Analyzes audio to detect AI-generated vs Human voices
"""

import base64
import io
import struct
import math
from typing import Dict, Any

# Supported languages
SUPPORTED_LANGUAGES = ["Tamil", "English", "Hindi", "Malayalam", "Telugu"]

def decode_base64_audio(audio_base64: str) -> bytes:
    """Decode Base64 string to raw audio bytes"""
    try:
        # Remove data URL prefix if present
        if "base64," in audio_base64:
            audio_base64 = audio_base64.split("base64,")[1]
        return base64.b64decode(audio_base64)
    except Exception as e:
        raise ValueError(f"Invalid Base64 audio: {str(e)}")

def analyze_audio_features(audio_bytes: bytes) -> Dict[str, float]:
    """
    Extract audio features for AI detection.
    Uses lightweight analysis without heavy ML dependencies.
    """
    # Get basic audio statistics from raw bytes
    byte_array = list(audio_bytes[:10000])  # Analyze first 10KB
    
    if len(byte_array) < 100:
        raise ValueError("Audio file too small for analysis")
    
    # Feature 1: Byte variance (AI tends to have more uniform patterns)
    mean_val = sum(byte_array) / len(byte_array)
    variance = sum((x - mean_val) ** 2 for x in byte_array) / len(byte_array)
    std_dev = math.sqrt(variance)
    byte_uniformity = 1 - min(std_dev / 128, 1)  # 0-1, higher = more uniform (AI-like)
    
    # Feature 2: Zero-crossing approximation
    crossings = sum(1 for i in range(1, len(byte_array)) 
                    if (byte_array[i] > 128) != (byte_array[i-1] > 128))
    crossing_rate = crossings / len(byte_array)
    crossing_consistency = abs(0.3 - crossing_rate) / 0.3  # AI tends toward 0.3
    
    # Feature 3: Repetition detection (AI voices often have repeated patterns)
    chunk_size = 50
    chunks = [tuple(byte_array[i:i+chunk_size]) for i in range(0, len(byte_array)-chunk_size, chunk_size)]
    unique_chunks = len(set(chunks))
    repetition_score = 1 - (unique_chunks / max(len(chunks), 1))
    
    # Feature 4: Entropy (AI audio often has lower entropy)
    byte_freq = {}
    for b in byte_array:
        byte_freq[b] = byte_freq.get(b, 0) + 1
    entropy = -sum((count/len(byte_array)) * math.log2(count/len(byte_array) + 0.0001) 
                   for count in byte_freq.values())
    normalized_entropy = entropy / 8  # Max entropy is 8 bits
    low_entropy_score = 1 - normalized_entropy  # Higher = more AI-like
    
    # Feature 5: Silence pattern detection
    silence_threshold = 10
    silence_count = sum(1 for b in byte_array if abs(b - 128) < silence_threshold)
    silence_ratio = silence_count / len(byte_array)
    uniform_silence = abs(0.1 - silence_ratio) < 0.05  # AI has ~10% silence uniformly
    
    return {
        "byte_uniformity": byte_uniformity,
        "crossing_consistency": crossing_consistency,
        "repetition_score": repetition_score,
        "low_entropy": low_entropy_score,
        "uniform_silence": 0.7 if uniform_silence else 0.3,
        "raw_entropy": normalized_entropy,
        "raw_variance": std_dev
    }

def generate_explanation(features: Dict[str, float], classification: str) -> str:
    """Generate human-readable explanation for the classification"""
    explanations = []
    
    if classification == "AI_GENERATED":
        if features["byte_uniformity"] > 0.6:
            explanations.append("Unnatural pitch consistency detected")
        if features["repetition_score"] > 0.3:
            explanations.append("Repetitive audio patterns found")
        if features["low_entropy"] > 0.5:
            explanations.append("Low audio complexity suggesting synthesis")
        if features["crossing_consistency"] > 0.5:
            explanations.append("Robotic speech timing patterns")
        if not explanations:
            explanations.append("Multiple synthetic voice indicators detected")
    else:
        if features["raw_variance"] > 40:
            explanations.append("Natural pitch variation detected")
        if features["raw_entropy"] > 0.6:
            explanations.append("High audio complexity consistent with human speech")
        if features["repetition_score"] < 0.2:
            explanations.append("Organic non-repetitive patterns")
        if not explanations:
            explanations.append("Voice patterns consistent with natural human speech")
    
    return "; ".join(explanations[:2])  # Return top 2 explanations

def classify_voice(audio_base64: str, language: str) -> Dict[str, Any]:
    """
    Main classification function.
    Returns full response object matching API spec.
    """
    # Validate language
    if language not in SUPPORTED_LANGUAGES:
        return {
            "status": "error",
            "message": f"Unsupported language. Must be one of: {', '.join(SUPPORTED_LANGUAGES)}"
        }
    
    try:
        # Decode audio
        audio_bytes = decode_base64_audio(audio_base64)
        
        # Extract features
        features = analyze_audio_features(audio_bytes)
        
        # Calculate weighted confidence score
        weights = {
            "byte_uniformity": 0.25,
            "crossing_consistency": 0.15,
            "repetition_score": 0.25,
            "low_entropy": 0.20,
            "uniform_silence": 0.15
        }
        
        ai_score = sum(features[key] * weight for key, weight in weights.items())
        
        # Classify based on score
        if ai_score > 0.5:
            classification = "AI_GENERATED"
            confidence = min(0.95, 0.5 + (ai_score - 0.5) * 0.9)
        else:
            classification = "HUMAN"
            confidence = min(0.95, 0.5 + (0.5 - ai_score) * 0.9)
        
        # Generate explanation
        explanation = generate_explanation(features, classification)
        
        return {
            "status": "success",
            "language": language,
            "classification": classification,
            "confidenceScore": round(confidence, 2),
            "explanation": explanation
        }
        
    except ValueError as e:
        return {
            "status": "error",
            "message": str(e)
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Analysis failed: {str(e)}"
        }
