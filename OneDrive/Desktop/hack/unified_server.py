from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
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

# ============ SERVE REACT FRONTEND ============

# Check if dist folder exists
dist_path = Path(__file__).parent / "cyber-sentinel-react" / "dist"

if dist_path.exists():
    # Mount static files (CSS, JS, images)
    app.mount("/assets", StaticFiles(directory=str(dist_path / "assets")), name="assets")
    
    # Serve index.html for all other routes (SPA routing)
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # If path starts with /api, it's already handled above
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        
        # Serve index.html for all frontend routes
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
