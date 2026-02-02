# 🚀 Naya GitHub Repository Banane ka Tarika

## Step 1: GitHub par Naya Repository Banayein

1. **Browser mein jaayen**: https://github.com/new
2. **Repository details bharein**:
   - **Repository name**: `cyber-sentinel-honeypot` (ya koi bhi naam)
   - **Description**: "🛡️ AI-powered honeypot system to detect and analyze scam attempts"
   - **Visibility**: Public ✅ (hackathon ke liye)
   - **Initialize repository**: ❌ DON'T check any boxes (README, .gitignore, license)
3. **Create repository** button click karein

## Step 2: Local Code ko Naye Repo se Connect Karein

GitHub par repository banne ke baad, aapko ek URL milega. Phir ye commands run karein:

```powershell
# Current directory check karein
cd C:\Users\dell\OneDrive\Desktop\hack

# Purana remote hata dein
git remote remove origin

# Naya remote add karein (APNA URL YAHAN LAGAYEIN)
git remote add origin https://github.com/Prashant9998/cyber-sentinel-honeypot.git

# Main branch ko main set karein
git branch -M main

# Sab kuch push karein
git push -u origin main
```

## Step 3: Verify Karein

Browser mein apna naya repository URL khol kar check karein ki sab files aa gayi hain.

---

## 🎯 Quick Commands (Copy-Paste Ready)

**Agar aapka GitHub username `Prashant9998` hai aur repo name `cyber-sentinel-honeypot`:**

```powershell
cd C:\Users\dell\OneDrive\Desktop\hack
git remote remove origin
git remote add origin https://github.com/Prashant9998/cyber-sentinel-honeypot.git
git branch -M main
git push -u origin main
```

---

## 🔐 Agar Authentication Error Aaye

Agar push karte waqt password maange:
- GitHub ab **Personal Access Token** use karta hai
- Token banane ke liye: https://github.com/settings/tokens
- "Generate new token (classic)" par click karein
- `repo` permissions select karein
- Token copy karein aur password ki jagah use karein

---

## ✅ Success ke baad

Aapka code is URL par hoga:
```
https://github.com/Prashant9998/cyber-sentinel-honeypot
```

Phir aap Render ya Vercel par deploy kar sakte hain! 🚀
