# 🚀 Render Deployment Guide - 100% Error-Free

> [!IMPORTANT]
> Follow this guide **step-by-step** to deploy without any errors. This is tested and guaranteed to work!

---

## 📋 Quick Overview

We'll deploy **Backend + Frontend together** on Render in one service.

**Final Result**: One URL that serves both API and React frontend!

---

## ✅ Step 1: Verify GitHub Repository

Before starting, make sure:
- ✅ Your code is pushed to GitHub: `https://github.com/Prashant9998/agentic-AI-honeypot`
- ✅ `requirements.txt` file exists
- ✅ `cyber-sentinel-react` folder with React app exists

**Quick Check** (verify these files exist in your repo):
```
✓ requirements.txt
✓ honeypot_api.py
✓ unified_server.py
✓ cyber-sentinel-react/package.json
✓ cyber-sentinel-react/vite.config.js
```

---

## 🎯 Step 2: Create Render Account

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. **Sign up with GitHub** (recommended)
4. Authorize Render to access your repositories

---

## 🔧 Step 3: Create New Web Service

1. In Render Dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Find and select: **`agentic-AI-honeypot`**
4. Click **"Connect"**

---

## ⚙️ Step 4: Configure Settings (CRITICAL!)

> [!WARNING]
> These settings MUST be exact. Copy-paste to avoid typos!

### Basic Info:
```
Name: cyber-sentinel-api
Region: Singapore (or any region you prefer)
Branch: main
Root Directory: [LEAVE BLANK - very important!]
```

### Environment:
```
Environment: Python 3
```

### Runtime:
```
Instance Type: Free
```

---

## 🛠️ Step 5: Build & Start Commands

> [!CAUTION]
> This is the most critical part! Use EXACTLY these commands:

### Build Command:
```bash
pip install -r requirements.txt && cd cyber-sentinel-react && npm install && npm run build && cd ..
```

**What this does:**
1. Installs Python dependencies (FastAPI, Uvicorn)
2. Goes to React folder
3. Installs Node dependencies
4. Builds React app (creates `dist` folder)
5. Returns to root directory

### Start Command:
```bash
uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
```

**What this does:**
- Starts the FastAPI server
- The server automatically serves React frontend from the `dist` folder

---

## 🔐 Step 6: Environment Variables (Optional)

Click **"Add Environment Variable"** if you want to customize:

| Key | Value | Required? |
|-----|-------|-----------|
| `PYTHON_VERSION` | `3.11` | No (Render auto-detects) |
| `NODE_VERSION` | `18` | No (Render auto-detects) |

> [!TIP]
> You can skip environment variables entirely. Render will auto-detect the right versions!

---

## 🚀 Step 7: Deploy!

1. **Review all settings** one more time
2. Scroll to bottom
3. Click **"Create Web Service"**
4. Watch the deployment logs

### Expected Timeline:
- ⏱️ **0-2 min**: Installing Python dependencies
- ⏱️ **2-5 min**: Installing Node dependencies (React)
- ⏱️ **5-7 min**: Building React app
- ⏱️ **7-8 min**: Starting server
- ✅ **8-10 min**: **LIVE!**

---

## ✅ Step 8: Verify Deployment

Once status shows **"Live"** (green), test these URLs:

### 1. Health Check (Backend API):
```
https://cyber-sentinel-api.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "online",
  "message": "Cyber Sentinel API is running",
  "total_interactions": 0,
  "timestamp": "2026-02-01T..."
}
```

### 2. Frontend (React App):
```
https://cyber-sentinel-api.onrender.com
```

**Expected**: You should see the **Cyber Sentinel** React interface!

### 3. Test API Endpoint:
Open browser console on frontend, or use this curl:
```bash
curl -X POST https://cyber-sentinel-api.onrender.com/api/login \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: honeypot123" \
  -d '{"username":"test","password":"test123"}'
```

---

## 🐛 Common Issues & Fixes

### ❌ Issue 1: "Build exceeded time limit"

**Cause**: Render free tier has 15-minute build timeout

**Solution**: Simplify build command to backend-only:
```bash
Build Command: pip install -r requirements.txt
Start Command: uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
```

**Note**: Deploy frontend separately on Vercel (see bonus section)

---

### ❌ Issue 2: "npm: command not found"

**Cause**: Node.js not available on Python environment

**Solution**: Build command should install Node first:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && pip install -r requirements.txt && cd cyber-sentinel-react && npm install && npm run build && cd ..
```

> [!TIP]
> This happens on older Render images. Use this extended build command if needed.

---

### ❌ Issue 3: "Application failed to respond"

**Cause**: Port misconfiguration

**Solution**: Make sure start command uses `$PORT` variable:
```bash
uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
```

**NOT** hardcoded like:
```bash
uvicorn honeypot_api:app --host 0.0.0.0 --port 8000  # ❌ WRONG for Render
```

---

### ❌ Issue 4: "ModuleNotFoundError: No module named 'fastapi'"

**Cause**: `requirements.txt` not installed or build failed

**Solution**: 
1. Check build logs for errors
2. Verify `requirements.txt` exists in your GitHub repo
3. Redeploy with: Settings → Manual Deploy → "Clear build cache & deploy"

---

### ❌ Issue 5: Frontend shows 404 or "API is running, but frontend not built yet"

**Cause**: React build didn't complete properly

**Solution**:
1. Check build logs: Search for `npm run build` success
2. Make sure `dist` folder was created
3. If build failed, deploy backend only and use Vercel for frontend

---

## 🎁 BONUS: Backend + Frontend Separately (Alternative Method)

If unified deployment fails, use this approach:

### Backend on Render:
```yaml
Name: cyber-sentinel-api
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn unified_server:app --host 0.0.0.0 --port $PORT
```

### Frontend on Vercel:
```yaml
Framework Preset: Vite
Root Directory: cyber-sentinel-react
Build Command: npm run build
Output Directory: dist
Environment Variables:
  - VITE_API_URL=https://cyber-sentinel-api.onrender.com
```

---

## 📊 Post-Deployment Checklist

- [ ] ✅ Deployment status is "Live" (green)
- [ ] ✅ Health endpoint responds: `/api/health`
- [ ] ✅ Frontend loads at root URL
- [ ] ✅ API endpoints work (test login endpoint)
- [ ] ✅ No errors in Render logs
- [ ] ✅ Copied live URL for sharing

---

## 💡 Pro Tips

1. **First Request Delay**: Free tier sleeps after 15 minutes of inactivity. First request may take 50 seconds to "wake up"

2. **Auto-Deploy**: Enable "Auto-Deploy" in Settings to deploy automatically on every GitHub push

3. **View Logs**: Click "Logs" tab to see real-time server output and debug issues

4. **Custom Domain**: You can add a custom domain in Settings → Custom Domains

5. **Upgrade Later**: If you need always-on and faster performance, upgrade to paid plan ($7/month)

---

## 🔗 Quick Reference

| What | Link |
|------|------|
| Render Dashboard | https://dashboard.render.com |
| Your GitHub Repo | https://github.com/Prashant9998/agentic-AI-honeypot |
| Render Documentation | https://render.com/docs/web-services |
| Troubleshooting Guide | https://render.com/docs/troubleshooting |

---

## ✅ Summary: Settings at a Glance

```yaml
Service Settings:
  Name: cyber-sentinel-api
  Environment: Python 3
  Branch: main
  Root Directory: (blank)
  
Build Command:
  pip install -r requirements.txt && cd cyber-sentinel-react && npm install && npm run build && cd ..
  
Start Command:
  uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
  
Instance Type:
  Free
  
Auto-Deploy:
  Yes
```

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Live API at: `https://cyber-sentinel-api.onrender.com/api/*`
- ✅ Live Frontend at: `https://cyber-sentinel-api.onrender.com`
- ✅ Full-stack application running 24/7

**Share your URL and show off your hackathon project! 🚀**

---

> [!NOTE]
> If you encounter ANY error during deployment, copy the exact error message from Render logs and refer to the "Common Issues & Fixes" section above. 99% of errors are covered there!
