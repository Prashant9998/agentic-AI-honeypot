# 🚀 Deployment Guide

Complete guide for deploying Cyber Sentinel to Vercel or Render.

---

## 📋 Table of Contents

- [Vercel Deployment](#vercel-deployment) - Frontend only
- [Render Deployment](#render-deployment) - Full stack (Backend + Frontend)
- [Environment Variables](#environment-variables)

---

## 🎯 Vercel Deployment

Deploy the React frontend to Vercel.

### Quick Deploy

1. **Go to Vercel**: https://vercel.com/new
2. **Import Repository**: `Prashant9998/agentic-AI-honeypot`
3. **Configure Settings**:
   ```
   Framework Preset: Vite
   Root Directory: cyber-sentinel-react
   Build Command: npm run build
   Output Directory: dist
   ```
4. **Click Deploy**

### Expected Timeline

- ⏱️ **1-2 min**: Installing dependencies
- ⏱️ **2-3 min**: Building React app
- ✅ **3-4 min**: **LIVE!**

### Verify Deployment

Visit: `https://your-app.vercel.app`

You should see the Cyber Sentinel interface!

---

## 🐍 Render Deployment

Deploy the full stack (Backend API + Frontend) to Render.

### Step 1: Create Web Service

1. Go to: https://render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select: `agentic-AI-honeypot`

### Step 2: Configure Service

**Basic Settings:**
```
Name: cyber-sentinel
Environment: Python 3
Branch: main
Root Directory: (leave blank)
Instance Type: Free
```

**Build Command:**
```bash
pip install -r requirements.txt && cd cyber-sentinel-react && npm install && npm run build && cd ..
```

**Start Command:**
```bash
uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
```

### Step 3: Deploy

1. Click **"Create Web Service"**
2. Wait 8-10 minutes for deployment
3. Check status becomes **"Live"**

### Verify Deployment

Test these endpoints:

1. **Health Check**: `https://your-app.onrender.com/api/health`
2. **Frontend**: `https://your-app.onrender.com`

---

## 🔐 Environment Variables

### For Vercel (if deploying frontend only):

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_URL` | `https://your-render-app.onrender.com` | Backend API URL |

### For Render (optional):

| Key | Value | Description |
|-----|-------|-------------|
| `PYTHON_VERSION` | `3.11` | Python version |
| `NODE_VERSION` | `18` | Node.js version |

---

## ✅ Post-Deployment Checklist

- [ ] Deployment status is "Live" or "Ready"
- [ ] Health endpoint returns 200 OK
- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly
- [ ] No console errors in browser

---

## 🔗 Quick Reference

- **Vercel Dashboard**: https://dashboard.vercel.com
- **Render Dashboard**: https://dashboard.render.com
- **GitHub Repository**: https://github.com/Prashant9998/agentic-AI-honeypot

---

**Need help?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.
