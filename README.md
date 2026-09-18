# 🚀 Cyber Sentinel - AI Honeypot System

Welcome to **Cyber Sentinel**, an AI-powered honeypot system designed to detect and analyze scam attempts!


## 🎯 Quick Start

### Local Development

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```''

2. **Start the server:**
   ```bash
   python honeypot_api.py
   ```

3. **Access the app:**
   - Frontend: http://localhost:8000
   - API: http://localhost:8000/api/health

### Deploy Online

- **Vercel** (Frontend): See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md#vercel)
- **Render** (Full Stack): See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md#render)

## 🛠️ Tech Stack

**Backend:**
- FastAPI - Modern Python web framework
- Uvicorn - ASGI server
- Pydantic - Data validation

**Frontend:**
- React 18
- Vite - Fast build tool
- Vanilla CSS

## 📖 Documentation

All guides are in the [`docs/`](docs/) folder:

- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deploy to Vercel or Render
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Fix common errors

## 🔑 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/login` | POST | Login honeypot |
| `/api/ivr` | POST | IVR honeypot |
| `/api/kyc` | POST | KYC verification honeypot |

**API Key:** `honeypot123` (add as `X-API-KEY` header)

## 🌐 Live Demo

- **GitHub**: https://github.com/Prashant9998/agentic-AI-honeypot
- **Deployed App**: (after deployment)

## 👨‍💻 Author

**Prashant Shukla**  
Cybersecurity Student | Ethical Hacker | AI Enthusiast

## 📄 License

MIT License - Feel free to use for your projects!



---

**Need help?** Check [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) or open an issue on GitHub!
