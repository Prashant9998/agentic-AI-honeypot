# Cyber Sentinel - Agentic AI Scam Honeypot

> 🛡️ **An intelligent honeypot system for detecting and analyzing scam attempts using AI agents**

## 🌟 Overview

Cyber Sentinel is an advanced threat intelligence system that uses Agentic AI to engage with scammers, waste their time, and extract valuable threat indicators. Built for hackathon purposes and cybersecurity research.

## ✨ Features

### 🤖 AI-Powered Scam Detection
- Intelligent conversation simulation with scammers
- Real-time voice-to-text and text-to-speech capabilities
- Natural language processing for scam indicator extraction

### 🎯 Honeypot API Endpoints
- **Login Honeypot**: Simulates vulnerable login pages
- **IVR System**: Interactive Voice Response scam detection
- **KYC Verification**: Fake KYC process to trap scammers

### 📊 Threat Intelligence
- Extracts UPI IDs, phone numbers, and phishing URLs
- Risk assessment and scam type classification
- Real-time threat indicator reporting

### 🎨 Modern UI/UX
- Cybersecurity-themed interface with neon accents
- HUD-style dashboard for threat monitoring
- Glitch effects and terminal-inspired design

## 🏗️ Project Structure

```
hack/
├── cyber-sentinel-react/     # React frontend application
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main application
│   └── package.json
├── Scam-Honeypot/           # Additional honeypot implementations
├── mock_api_server.py       # Python FastAPI backend
└── HOW_TO_MAKE_SERVER_ONLINE.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Modern web browser with Web Speech API support

### Frontend Setup
```bash
cd cyber-sentinel-react
npm install
npm run dev
```

### Backend Setup
```bash
pip install fastapi uvicorn
python mock_api_server.py
```

The frontend will run on `http://localhost:5173`  
The API server will run on `http://localhost:8000`

## 🎮 Usage

1. **Start the Backend**: Run `mock_api_server.py` to start the honeypot API
2. **Launch Frontend**: Start the React app with `npm run dev`
3. **Test API**: Use the API Tester component to interact with honeypot endpoints
4. **Voice Simulation**: Click "Engage Voice" to start voice-based scam simulation

## 🔧 Technology Stack

### Frontend
- React 18
- Vite
- Web Speech API
- CSS3 with cyberpunk aesthetics

### Backend
- Python FastAPI
- AI-powered response generation
- RESTful API architecture

## 🛡️ Ethical Considerations

**Important**: This is a research and educational project designed for:
- ✅ Studying scam tactics in a controlled environment
- ✅ Training cybersecurity professionals
- ✅ Hackathon demonstrations
- ❌ NOT for engaging real scammers without proper authorization
- ❌ NOT for production use without security hardening

## 📝 API Endpoints

### POST `/api/honeypot/login`
Simulates a vulnerable login system
```json
{
  "username": "test@example.com",
  "password": "password123"
}
```

### POST `/api/honeypot/ivr`
Interactive Voice Response simulation
```json
{
  "phone_number": "+91XXXXXXXXXX",
  "input": "1"
}
```

### POST `/api/honeypot/kyc`
Fake KYC verification process
```json
{
  "name": "John Doe",
  "document_type": "aadhar",
  "document_number": "1234-5678-9012"
}
```

## 🎯 Features Roadmap

- [x] Voice-based scam simulation
- [x] Real-time threat indicator extraction
- [x] API testing interface
- [x] Risk assessment system
- [ ] Database integration for threat intelligence
- [ ] Machine learning for scam pattern detection
- [ ] Multi-language support
- [ ] Deployment guides for cloud platforms

## 👨‍💻 Author

**Prashant Shukla**
- 🎓 Cybersecurity Student
- 🌍 India
- 💼 Ethical Hacking | OSINT | Malware Analysis | AI Security

## 📄 License

MIT License - feel free to use for educational purposes

## 🙏 Acknowledgments

Built for hackathon - demonstrating the power of AI in cybersecurity defense.

---

⭐ **Star this repository if you find it useful!**
