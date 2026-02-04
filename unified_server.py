from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uvicorn
from datetime import datetime
from pathlib import Path

app = FastAPI(title="Cyber Sentinel - Unified Server")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key for authentication
VALID_API_KEY = "honeypot123"

# Models
class LoginRequest(BaseModel):
    username: str
    password: str

class IVRRequest(BaseModel):
    caller_id: str
    input: str

class KYCRequest(BaseModel):
    aadhaar: str
    pan: str

# Database simulation
interactions = []

# Authentication dependency
def verify_api_key(x_api_key: Optional[str] = Header(None)):
    if x_api_key != VALID_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")
    return x_api_key

# ============ API ENDPOINTS ============

@app.get("/api/health")
async def health_check():
    return {
        "status": "online",
        "message": "Cyber Sentinel API is running",
        "total_interactions": len(interactions),
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/login")
async def login(request: LoginRequest, api_key: str = Header(None, alias="X-API-KEY")):
    verify_api_key(api_key)
    
    interaction = {
        "type": "login",
        "timestamp": datetime.now().isoformat(),
        "data": {
            "username": request.username,
            "password_length": len(request.password)
        }
    }
    interactions.append(interaction)
    
    return {
        "success": True,
        "message": "Login attempt recorded",
        "session_id": f"session_{len(interactions)}",
        "analysis": {
            "threat_level": "medium",
            "suspicious_patterns": ["common_password", "brute_force_attempt"]
        },
        "ai_response": "Aapka username aur password sahi lag raha hai, but ek baar OTP verify kar lijiye."
    }

@app.post("/api/ivr")
async def ivr(request: IVRRequest, api_key: str = Header(None, alias="X-API-KEY")):
    verify_api_key(api_key)
    
    interaction = {
        "type": "ivr",
        "timestamp": datetime.now().isoformat(),
        "data": {
            "caller_id": request.caller_id,
            "input": request.input
        }
    }
    interactions.append(interaction)
    
    return {
        "success": True,
        "message": "IVR interaction recorded",
        "caller_id": request.caller_id,
        "response": "Namaste, aapka call bahut zaroori hai. Kripya apna Aadhaar number aur OTP share karein verification ke liye.",
        "analysis": {
            "threat_level": "high",
            "scam_indicators": ["urgent_request", "personal_info_request"],
            "caller_location": "Unknown"
        },
        "next_action": "Request OTP verification"
    }

@app.post("/api/kyc")
async def kyc(request: KYCRequest, api_key: str = Header(None, alias="X-API-KEY")):
    verify_api_key(api_key)
    
    interaction = {
        "type": "kyc",
        "timestamp": datetime.now().isoformat(),
        "data": {
            "aadhaar": request.aadhaar,
            "pan": request.pan
        }
    }
    interactions.append(interaction)
    
    return {
        "success": True,
        "message": "KYC verification recorded",
        "verification_status": "pending",
        "analysis": {
            "threat_level": "high",
            "scam_indicators": ["fake_kyc_request", "identity_theft_attempt"],
            "confidence": 0.87
        },
        "ai_response": "Aapka KYC documents submit ho gaye hain. Verification mein 24-48 hours lagenge. Koi OTP share mat kijiye.",
        "documents_received": {
            "aadhaar": f"XXXX-XXXX-{request.aadhaar[-4:]}",
            "pan": request.pan[:5] + "****" + request.pan[-1:]
        }
    }

@app.get("/api/interactions")
async def get_interactions(api_key: str = Header(None, alias="X-API-KEY")):
    verify_api_key(api_key)
    return {
        "total": len(interactions),
        "interactions": interactions[-10:]  # Last 10
    }

# ============ VOICE DETECTION API ============

class VoiceDetectionRequest(BaseModel):
    language: str
    audioFormat: str
    audioBase64: str

@app.post("/api/voice-detection")
async def detect_voice(request: VoiceDetectionRequest, x_api_key: str = Header(None, alias="x-api-key")):
    """
    Detect if voice audio is AI-generated or Human.
    Supports: Tamil, English, Hindi, Malayalam, Telugu
    """
    # Validate API key
    verify_api_key(x_api_key)
    
    # Validate audio format
    if request.audioFormat.lower() != "mp3":
        return {
            "status": "error",
            "message": "Only MP3 format is supported"
        }
    
    # Import and use voice detector
    from voice_detector import classify_voice
    
    result = classify_voice(request.audioBase64, request.language)
    
    # Log the interaction
    interactions.append({
        "type": "voice_detection",
        "timestamp": datetime.now().isoformat(),
        "data": {
            "language": request.language,
            "classification": result.get("classification", "unknown"),
            "confidence": result.get("confidenceScore", 0)
        }
    })
    
    return result

# ============ SCAM HONEYPOT API (Problem Statement 2) ============

class MessageModel(BaseModel):
    sender: str
    text: str
    timestamp: int

class MetadataModel(BaseModel):
    channel: Optional[str] = "SMS"
    language: Optional[str] = "English"
    locale: Optional[str] = "IN"

class HoneypotRequest(BaseModel):
    sessionId: str
    message: MessageModel
    conversationHistory: Optional[List[Dict[str, Any]]] = []
    metadata: Optional[MetadataModel] = None

@app.post("/api/honeypot")
async def honeypot_endpoint(request: HoneypotRequest, x_api_key: str = Header(None, alias="x-api-key")):
    """
    Agentic Honeypot for Scam Detection.
    Accepts scam messages and returns confused user responses.
    """
    # Validate API key
    verify_api_key(x_api_key)
    
    # Import and use honeypot agent
    from honeypot_agent import process_honeypot_message
    
    result = process_honeypot_message(
        session_id=request.sessionId,
        message=request.message.dict(),
        conversation_history=request.conversationHistory or [],
        metadata=request.metadata.dict() if request.metadata else None
    )
    
    # Log the interaction
    interactions.append({
        "type": "honeypot",
        "timestamp": datetime.now().isoformat(),
        "data": {
            "session_id": request.sessionId,
            "scammer_message": request.message.text[:100],
            "agent_reply": result.get("reply", "")[:100]
        }
    })
    
    return result

# Also handle POST to root URL for validators that send to base URL
@app.post("/")
async def root_honeypot(request: Request, x_api_key: str = Header(None, alias="x-api-key")):
    """Handle POST to root URL - redirect to honeypot"""
    verify_api_key(x_api_key)
    
    try:
        body = await request.json()
        
        # Import and use honeypot agent
        from honeypot_agent import process_honeypot_message
        
        result = process_honeypot_message(
            session_id=body.get("sessionId", "unknown"),
            message=body.get("message", {}),
            conversation_history=body.get("conversationHistory", []),
            metadata=body.get("metadata")
        )
        
        return result
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# Endpoint to finalize session and send GUVI callback
class FinalizeRequest(BaseModel):
    sessionId: str
    conversationHistory: Optional[List[Dict[str, Any]]] = []

@app.post("/api/finalize-session")
async def finalize_session_endpoint(request: FinalizeRequest, x_api_key: str = Header(None, alias="x-api-key")):
    """
    Finalize a honeypot session and send results to GUVI.
    MANDATORY: Call this after conversation ends for hackathon scoring.
    """
    verify_api_key(x_api_key)
    
    from honeypot_agent import finalize_session
    
    result = finalize_session(
        session_id=request.sessionId,
        conversation_history=request.conversationHistory or []
    )
    
    # Log the finalization
    interactions.append({
        "type": "session_finalized",
        "timestamp": datetime.now().isoformat(),
        "data": {
            "session_id": request.sessionId,
            "guvi_callback_sent": result.get("guvi_callback", {}).get("callback_sent", False)
        }
    })
    
    return result

# ============ SERVE REACT FRONTEND ============

# Check if dist folder exists
dist_path = Path(__file__).parent / "cyber-sentinel-react" / "dist"

if dist_path.exists():
    # Mount static files (CSS, JS, images)
    app.mount("/assets", StaticFiles(directory=str(dist_path / "assets")), name="assets")
    
    # Serve index.html for all other routes (SPA routing)
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str, request: Request = None):
        # If path starts with /api, it's already handled above
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
            
        # SMART HANDLING: If client asks for JSON (like Validator tools), return JSON info
        # instead of HTML, even at the root path.
        if request:
            accept = request.headers.get("accept", "")
            if "application/json" in accept:
                return {
                    "status": "online",
                    "project": "Cyber Sentinel",
                    "message": "You have reached the root URL. The Frontend is served here for browsers. For API, use /api/login, /api/ivr, etc.",
                    "documentation": "/docs"
                }
        
        # Serve index.html for all frontend routes (Browsers)
        return FileResponse(str(dist_path / "index.html"))
else:
    print("⚠️  Warning: React build folder not found. Run 'npm run build' first!")
    
    @app.get("/")
    async def no_frontend():
        return {
            "message": "API is running, but frontend not built yet",
            "instructions": "Run 'cd cyber-sentinel-react && npm run build' to build the frontend"
        }

if __name__ == "__main__":
    print("=" * 60)
    print("CYBER SENTINEL - Unified Server")
    print("=" * 60)
    print("Server URL: http://localhost:8000")
    print("API Key: honeypot123")
    print("Health Check: http://localhost:8000/api/health")
    print("Frontend: http://localhost:8000")
    print("=" * 60)
    print("Press Ctrl+C to stop the server\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
