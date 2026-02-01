from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from datetime import datetime

app = FastAPI(title="Honeypot API - Mock Server")

# CORS middleware for React app
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

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "status": "online",
        "message": "Honeypot API is running",
        "total_interactions": len(interactions),
        "timestamp": datetime.now().isoformat()
    }

# Login endpoint
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

# IVR endpoint
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

# KYC endpoint
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

# Get all interactions
@app.get("/api/interactions")
async def get_interactions(api_key: str = Header(None, alias="X-API-KEY")):
    verify_api_key(api_key)
    return {
        "total": len(interactions),
        "interactions": interactions[-10:]  # Last 10
    }

if __name__ == "__main__":
    print("🛡️ Honeypot Mock API Server Starting...")
    print("📍 API will be available at: http://localhost:8000")
    print("🔑 API Key: honeypot123")
    print("📊 Health Check: http://localhost:8000/api/health")
    print("\n✅ Press Ctrl+C to stop the server\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
