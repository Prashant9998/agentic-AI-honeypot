# 🔧 Troubleshooting Guide

Common issues and solutions for Cyber Sentinel deployment.

---

## 📋 Table of Contents

- [Vercel Issues](#vercel-issues)
- [Render Issues](#render-issues)
- [Local Development Issues](#local-development-issues)

---

## 🌐 Vercel Issues

### ❌ Error: 404 NOT_FOUND

**Cause**: Deploying from wrong directory

**Solution**:
1. Go to Vercel project settings
2. Set **Root Directory** to `cyber-sentinel-react`
3. Redeploy

### ❌ Error: Build Failed

**Cause**: Missing dependencies or incorrect build command

**Solution**:
1. Check build logs for specific error
2. Verify `package.json` exists in `cyber-sentinel-react`
3. Build command should be: `npm run build`
4. Output directory should be: `dist`

---

## 🐍 Render Issues

### ❌ Error: Build Timeout

**Cause**: Build takes longer than 15 minutes (free tier limit)

**Solution**:
Deploy backend only, frontend on Vercel:
```bash
Build Command: pip install -r requirements.txt
Start Command: uvicorn unified_server:app --host 0.0.0.0 --port $PORT
```

### ❌ Error: npm command not found

**Cause**: Node.js not available on Python environment

**Solution**:
Use extended build command:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && pip install -r requirements.txt && cd cyber-sentinel-react && npm install && npm run build && cd ..
```

### ❌ Error: Application failed to respond

**Cause**: Wrong port configuration

**Solution**:
Make sure start command uses `$PORT` variable:
```bash
uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
```

### ❌ Error: ModuleNotFoundError

**Cause**: Python dependencies not installed

**Solution**:
1. Verify `requirements.txt` exists in root
2. Check build logs for pip install errors
3. Try manual deploy with "Clear build cache"

---

## 💻 Local Development Issues

### ❌ Error: Python not found

**Cause**: Python not installed

**Solution**:
1. Download Python from: https://python.org/downloads
2. During installation, check "Add Python to PATH"
3. Restart terminal
4. Verify: `python --version`

### ❌ Error: pip install -r requirements.txt failed

**Cause**: Missing requirements.txt or permission issues

**Solution**:
1. Navigate to project directory: `cd C:\Users\dell\OneDrive\Desktop\hack`
2. Verify file exists: `dir requirements.txt`
3. Run: `pip install -r requirements.txt`

### ❌ Error: Port 8000 already in use

**Cause**: Another application using port 8000

**Solution**:
1. Stop other application
2. Or change port in `honeypot_api.py`:
   ```python
   uvicorn.run(app, host="0.0.0.0", port=8001)
   ```

---

## 🔍 Debugging Tips

### Check Deployment Logs

**Vercel:**
1. Go to deployment
2. Click "Building" or "Deploying" phase
3. Review error messages

**Render:**
1. Click "Logs" tab
2. Filter by "Build" or "Deploy"
3. Look for red error messages

### Test API Locally

```bash
# Start server
python honeypot_api.py

# Test in browser
http://localhost:8000/api/health
```

### Test React Build Locally

```bash
cd cyber-sentinel-react
npm install
npm run build
npm run preview
```

---

## 🆘 Still Having Issues?

1. **Check GitHub Issues**: Search for similar problems
2. **Review logs**: Deployment logs usually show the exact error
3. **Clear cache**: Try "Clear build cache & deploy"
4. **Fresh deploy**: Delete project and redeploy from scratch

---

**Back to**: [DEPLOYMENT.md](DEPLOYMENT.md)
