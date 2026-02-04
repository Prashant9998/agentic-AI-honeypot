"""
Scam Honeypot Agent Module
AI agent that engages scammers in conversation and extracts intelligence
"""

import random
import re
from typing import Dict, List, Any, Optional

# Session storage for multi-turn conversations
sessions: Dict[str, Dict] = {}

# Confused user response templates
CONFUSED_RESPONSES = {
    "initial": [
        "Kya? Mera account block ho jayega? Lekin maine kuch galat nahi kiya.",
        "Why is my account being suspended? I didn't do anything wrong.",
        "Haan ji, kya hua? Mujhe samajh nahi aaya.",
        "Oh no! Please tell me what happened? I'm very worried now.",
        "Arey baap re! Yeh kaise ho gaya? Mujhe batao kya karna hai.",
    ],
    "asking_details": [
        "Which bank account are you talking about? I have multiple accounts.",
        "Konsa account? SBI wala ya HDFC wala?",
        "Please tell me more details. I am old, I don't understand these things.",
        "Acha acha, lekin verification ke liye kya karna padega?",
        "Okay, but how do I verify? What is the process?",
    ],
    "giving_fake_info": [
        "My Aadhaar number is... wait, let me find my card first.",
        "Haan, mera phone number hai... actually ek minute...",
        "UPI? Haan mera UPI hai, name@okicici... I think.",
        "Okay I will share, but first tell me your employee ID?",
        "Account number? Let me check my passbook, it's very old.",
    ],
    "stalling": [
        "Please wait, my grandson just came. He understands these things better.",
        "Ek minute, phone pe battery kam hai, I will call you back.",
        "Haan haan, I'm writing it down. Please speak slowly.",
        "Sorry, network problem. Can you repeat that?",
        "Actually my reading glasses are somewhere. Wait.",
    ],
    "suspicious": [
        "But why do you need my OTP? Bank never asks for OTP.",
        "Acha, lekin yeh phone number toh bank ka nahi lag raha.",
        "My son told me never to share OTP with anyone.",
        "Can I call the bank directly to verify this?",
        "Is this really from the bank? How can I trust you?",
    ]
}

# Scam keywords to detect
SCAM_KEYWORDS = [
    "block", "suspend", "verify", "urgent", "immediately",
    "OTP", "UPI", "account", "KYC", "link", "click",
    "transfer", "payment", "refund", "lottery", "prize",
    "Aadhaar", "PAN", "bank", "frozen", "illegal"
]

def detect_scam_intent(text: str) -> tuple[bool, List[str]]:
    """Detect if message contains scam indicators"""
    text_lower = text.lower()
    found_keywords = []
    
    for keyword in SCAM_KEYWORDS:
        if keyword.lower() in text_lower:
            found_keywords.append(keyword)
    
    # Check for urgency patterns
    urgency_patterns = [
        r'\d+\s*(hour|minute|hr|min)',
        r'today',
        r'now',
        r'immediate',
        r'urgent'
    ]
    
    for pattern in urgency_patterns:
        if re.search(pattern, text_lower):
            if "urgent" not in found_keywords:
                found_keywords.append("urgent_language")
    
    # Scam if 2+ keywords found
    is_scam = len(found_keywords) >= 1
    
    return is_scam, found_keywords

def extract_intelligence(conversation_history: List[Dict]) -> Dict[str, List[str]]:
    """Extract scam intelligence from conversation"""
    intelligence = {
        "bankAccounts": [],
        "upiIds": [],
        "phishingLinks": [],
        "phoneNumbers": [],
        "suspiciousKeywords": []
    }
    
    all_text = " ".join([msg.get("text", "") for msg in conversation_history])
    
    # Extract UPI IDs
    upi_pattern = r'[\w.-]+@[\w]+'
    upi_matches = re.findall(upi_pattern, all_text)
    intelligence["upiIds"] = list(set(upi_matches))
    
    # Extract phone numbers
    phone_pattern = r'[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}'
    phone_matches = re.findall(phone_pattern, all_text)
    intelligence["phoneNumbers"] = list(set(phone_matches))
    
    # Extract links
    link_pattern = r'https?://[^\s<>"{}|\\^`\[\]]+'
    link_matches = re.findall(link_pattern, all_text)
    intelligence["phishingLinks"] = list(set(link_matches))
    
    # Extract bank account patterns
    account_pattern = r'\b\d{9,18}\b'
    account_matches = re.findall(account_pattern, all_text)
    intelligence["bankAccounts"] = list(set(account_matches))
    
    # Get suspicious keywords
    for keyword in SCAM_KEYWORDS:
        if keyword.lower() in all_text.lower():
            intelligence["suspiciousKeywords"].append(keyword)
    
    intelligence["suspiciousKeywords"] = list(set(intelligence["suspiciousKeywords"]))
    
    return intelligence

def get_agent_response(message_text: str, conversation_history: List[Dict], session_id: str) -> str:
    """Generate confused user response based on conversation state"""
    
    # Get or create session
    if session_id not in sessions:
        sessions[session_id] = {
            "turn_count": 0,
            "state": "initial"
        }
    
    session = sessions[session_id]
    session["turn_count"] += 1
    turn = session["turn_count"]
    
    # Detect scam patterns in current message
    is_scam, keywords = detect_scam_intent(message_text)
    
    # Choose response category based on conversation turn
    if turn == 1:
        category = "initial"
    elif turn == 2:
        category = "asking_details"
    elif turn <= 4:
        category = "giving_fake_info"
    elif turn <= 6:
        category = "stalling"
    else:
        category = "suspicious"
    
    # Special handling based on scam keywords
    if any(k in message_text.lower() for k in ["otp", "password", "pin"]):
        category = "suspicious"
    elif any(k in message_text.lower() for k in ["upi", "account", "number"]):
        category = "giving_fake_info"
    
    session["state"] = category
    
    # Get random response from category
    responses = CONFUSED_RESPONSES.get(category, CONFUSED_RESPONSES["initial"])
    return random.choice(responses)

def process_honeypot_message(
    session_id: str,
    message: Dict[str, Any],
    conversation_history: List[Dict],
    metadata: Optional[Dict] = None
) -> Dict[str, Any]:
    """
    Process incoming scam message and generate response.
    Returns format matching hackathon specification.
    """
    
    message_text = message.get("text", "")
    
    # Detect scam
    is_scam, keywords = detect_scam_intent(message_text)
    
    # Generate agent response
    reply = get_agent_response(message_text, conversation_history, session_id)
    
    # Store in session for later intelligence extraction
    if session_id not in sessions:
        sessions[session_id] = {"turn_count": 0, "state": "initial"}
    
    sessions[session_id]["scam_detected"] = is_scam
    sessions[session_id]["keywords"] = keywords
    
    return {
        "status": "success",
        "reply": reply
    }

def get_session_intelligence(session_id: str, conversation_history: List[Dict]) -> Dict[str, Any]:
    """Get full intelligence report for a session"""
    session = sessions.get(session_id, {})
    intelligence = extract_intelligence(conversation_history)
    
    return {
        "sessionId": session_id,
        "scamDetected": session.get("scam_detected", False),
        "totalMessagesExchanged": session.get("turn_count", 0),
        "extractedIntelligence": intelligence,
        "agentNotes": f"Session state: {session.get('state', 'unknown')}"
    }
