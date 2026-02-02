# 🚀 Render.com Deployment Settings

## Step-by-Step Guide: Render पर Deploy करें

---

## ✅ Prerequisites (पहले ये करें)

- [x] GitHub पर code upload हो गया ✅
- [x] Repository: https://github.com/Prashant9998/agentic-AI-honeypot

---

## 📋 Render Deployment Steps

### Step 1: Render Account बनाएं
1. जाएं: https://render.com
2. **"Get Started for Free"** click करें
3. GitHub से sign in करें
4. Render को अपनी GitHub repositories access दें

---

### Step 2: New Web Service बनाएं

1. Dashboard में **"New +"** button click करें
2. **"Web Service"** select करें
3. अपनी repository **"agentic-AI-honeypot"** select करें
4. **"Connect"** click करें

---

### Step 3: Configuration Settings (बहुत Important!)

#### Basic Settings:
```
Name: cyber-sentinel-api
Region: Singapore (या कोई भी)
Branch: main
Root Directory: (leave blank)
```

#### Environment:
```
Environment: Python 3
```

#### Build Command:
```bash
cd cyber-sentinel-react && npm install && npm run build && cd .. && pip install -r requirements.txt
```

#### Start Command:
```bash
uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
```

**या Alternative Start Command:**
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

#### Instance Type:
```
Free (0$/month)
```

---

### Step 4: Environment Variables (Optional)

Agar chahein to add kar sakte hain:

| Key | Value |
|-----|-------|
| `API_KEY` | `honeypot123` |
| `PYTHON_VERSION` | `3.11` |

---

### Step 5: Deploy!

1. सभी settings review करें
2. **"Create Web Service"** button click करें
3. Deploy होने में **5-10 minutes** लगेंगे

---

## 🎯 Expected Render Settings Summary

```yaml
Name: cyber-sentinel-api
Environment: Python 3
Branch: main
Root Directory: (blank)

Build Command:
  cd cyber-sentinel-react && npm install && npm run build && cd .. && pip install -r requirements.txt

Start Command:
  uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT

Instance Type: Free
Auto-Deploy: Yes
```

---

## ✅ Deployment Success कैसे पता चलेगा?

Deploy होने के बाद आपको milega:
- **Live URL**: `https://cyber-sentinel-api.onrender.com`
- **Status**: "Live" (green)

### Test करें:
```
Health Check: https://cyber-sentinel-api.onrender.com/api/health
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

---

## 🔧 Common Issues & Solutions

### Issue 1: Build Failed
**Error**: `npm: command not found`

**Solution**: Build command में Node.js install करें:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && cd cyber-sentinel-react && npm install && npm run build && cd .. && pip install -r requirements.txt
```

### Issue 2: Port Error
**Error**: `Port already in use`

**Solution**: Start command में `$PORT` variable use करना न भूलें:
```bash
uvicorn honeypot_api:app --host 0.0.0.0 --port $PORT
```

### Issue 3: Module Not Found
**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**: Build command में pip install check करें

---

## 🎨 After Deployment

### 1. Frontend Deploy करें (Vercel)
Frontend separately Vercel पर deploy करें:

**Vercel Settings:**
```
Framework: Vite
Root Directory: cyber-sentinel-react
Build Command: npm run build
Output Directory: dist
```

**Environment Variable:**
```
VITE_API_URL=https://cyber-sentinel-api.onrender.com
```

### 2. API URL Update करें
Frontend में backend URL update करें

---

## 📊 Deployment Checklist

- [ ] Render account बनाया
- [ ] GitHub repository connect किया
- [ ] Build command सही से set किया
- [ ] Start command सही से set किया
- [ ] Deploy button दबाया
- [ ] Deployment logs check किए
- [ ] Health endpoint test किया
- [ ] Live URL मिला

---

## 🔗 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Your Repository**: https://github.com/Prashant9998/agentic-AI-honeypot
- **Render Docs**: https://render.com/docs

---

## 💡 Pro Tips

1. **Free tier** पर sleep mode है - पहली request में 50 seconds lag सकता है
2. Deploy होने में **5-10 minutes** लगते हैं
3. Logs देखने के लिए **"Logs"** tab check करें
4. Auto-deploy **ON** रखें - har GitHub push पर automatic deploy होगा

---

## ✅ Success!

Deployment successful होने के बाद:
```
🎉 Your API is live!
URL: https://your-app-name.onrender.com
Health: https://your-app-name.onrender.com/api/health
```

**Ab aap production में हैं!** 🚀
