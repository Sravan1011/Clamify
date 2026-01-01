# 🛡️ Claime AI - AI-Powered Fact-Checking System

<div align="center">

![Claime AI](https://img.shields.io/badge/Claime%20AI-Fact%20Checker-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.12+-green?style=for-the-badge&logo=python)
![LangGraph](https://img.shields.io/badge/LangGraph-Orchestration-purple?style=for-the-badge)


**Multi-Agent Verification System with AI-Powered Analysis**

[Features](#features) • [Architecture](#architecture) • [Setup](#setup) • [Usage](#usage) • [Workflows](#workflows)

</div>

---

## 🚩 Problem

Misinformation spreads **6x faster** than truth. Manual fact-checking is slow, filters are easily gamed, and AI verdicts lack accountability.

---

## 💡 Solution

Claime AI is a **security checkpoint** for information:
- **Multi-Agent AI**: Three specialized agents
- **Probability Verdicts**: e.g. "78% likely FALSE" with reasoning
- **PDF Reports**: Comprehensive evidence documentation

---

## ✨ Features

- 🔍 Fact Checker: Async web search
- 🕵️ Forensic Expert: Linguistic & AI detection
- ⚖️ The Judge: Trust-weighted consensus
- ⚡ Parallel execution
- 📄 PDF reports
- 🔐 **BYOK (Bring Your Own Key)**: Secure client-side API key management
- ☁️ Shelby decentralized storage

---

## 🏗️ Architecture

```
moveh/
├── backend/         # FastAPI, agents, PDF generation
├── frontend/        # Next.js UI
├── workflows/       # Mermaid diagrams
├── reports/         # PDF reports
└── logs/            # Execution logs
```

---

## 🛠️ Tech Stack

| Component         | Technology         | Purpose                        |
|-------------------|-------------------|--------------------------------|
| AI Orchestration  | LangGraph         | Multi-agent state machines     |
| LLM               | Gemini 2.0 Flash  | Fast, cost-effective inference |
| Web Search        | Tavily API        | Real-time fact verification    |
| PDF Generation    | ReportLab         | Professional reports           |
| Decentralized Storage | Shelby Protocol | Evidence preservation         |

---

## 📦 Setup

### Prerequisites

- Python 3.12+
- Node.js 18+ (for frontend)
- [uv](https://docs.astral.sh/uv/) or pip
- Shelby CLI (optional for decentralized storage)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sravan1011/Clamify
   
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   
   # Create virtual environment
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run the server
   uvicorn api:app --reload
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   
   # Install dependencies
   pnpm install
   
   # Create environment file
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000" > .env.local
   
   # Run development server
   pnpm dev
   ```

### 🔐 API Configuration (BYOK)

Claime AI uses a **Bring Your Own Key** architecture. You do **not** need to configure API keys in the backend for general use.

1. Open the application in your browser (http://localhost:3000).
2. You will be prompted to enter your **Google Gemini API Key**.
3. (Optional) Enter your **Tavily API Key** for web search capabilities.
4. Keys are stored securely in your browser's local storage and sent with each request.

### Environment Variables (Optional Fallback)

If you are hosting a private instance or developing, you can still set default API keys in the backend `.env` file. These will be used if the user **does not** provide keys in the frontend.

Create `backend/.env`:

```env
# Optional: Fallback keys if not provided by frontend
GOOGLE_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

**Where to get API keys:**
- **GOOGLE_API_KEY**: [Google AI Studio](https://aistudio.google.com/app/apikey)
- **TAVILY_API_KEY**: [Tavily API](https://tavily.com/)

---

## 🚀 Usage

- **Frontend:** Visit [http://localhost:3000](http://localhost:3000)
  - Click the **Settings (⚙️)** icon in the navbar to manage your API keys.
- **API:** Visit [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🤝 Contributing

1. Fork and clone
2. Create a feature branch
3. Commit and push
4. Open a PR

---

## 📄 License

MIT License

---

<div align="center">

**🛡️ Claime AI - "Trust, but Verify"**



</div>
