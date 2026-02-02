# FastAPI Entrypoint
# This file serves as the deployment entrypoint for platforms like Render/Vercel
from unified_server import app

# The 'app' variable is what deployment platforms look for
# All actual logic is in unified_server.py
