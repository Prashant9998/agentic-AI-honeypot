# Cyber Sentinel - Unified Deployment 🚀

## Quick Start (Local)

### 1. Build Frontend
```bash
cd cyber-sentinel-react
npm install
npm run build
cd ..
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Unified Server
```bash
python unified_server.py
```

**Access**: http://localhost:8000
- Frontend: http://localhost:8000
- API: http://localhost:8000/api/health
- API Key: `honeypot123`

---

## Deploy to Render.com (Single Server)

### 1. Push to GitHub
```bash
git add .
git commit -m "Add unified server"
git push
```

### 2. Configure on Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo

**Settings**:
```
Name: cyber-sentinel
Environment: Python
Build Command: cd cyber-sentinel-react && npm install && npm run build && cd .. && pip install -r requirements.txt
Start Command: python unified_server.py
```

### 3. Deploy!
Click "Create Web Service" and wait ~3-5 minutes.

Your app will be live at: `https://cyber-sentinel.onrender.com`

---

## How It Works

The unified server:
- ✅ Serves React frontend (built files from `dist/`)
- ✅ Handles API requests at `/api/*`
- ✅ Single port (8000)
- ✅ Single deployment
- ✅ Automatic SPA routing

**No more 405 errors!** Everything is on one server.
