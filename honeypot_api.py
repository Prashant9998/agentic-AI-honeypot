#!/usr/bin/env python3
"""
Cyber Sentinel - Honeypot API Server
Main entry point for the unified server
Last updated: 2026-02-04 22:36 IST - Force rebuild for Render
"""

# Import the FastAPI app from unified_server
# This includes ALL endpoints: honeypot, voice-detection, finalize-session
from unified_server import app
import uvicorn

# Expose app for uvicorn: `uvicorn honeypot_api:app`
__all__ = ['app']

if __name__ == "__main__":
    print("=" * 60)
    print("CYBER SENTINEL - Honeypot API Server")
    print("=" * 60)
    print("Server URL: http://localhost:8000")
    print("API Key: honeypot123")
    print("Health Check: http://localhost:8000/api/health")
    print("Frontend: http://localhost:8000")
    print("=" * 60)
    print("Server is starting... Press Ctrl+C to stop\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
