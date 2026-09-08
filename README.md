# ⚡ Groq AI Studio

A modern AI chat application powered by the **Groq API**, **FastAPI**, and a beautiful responsive web interface.

The application provides two intelligent conversation modes:

- 💬 **Basic Chat** — General-purpose AI conversation
- 📚 **RAG Chat** — Answers questions using information from a local knowledge document

---

## ✨ Features

### 💬 Basic AI Chat

Chat with Groq AI using a simple and responsive interface.

The assistant can:

- Answer general questions
- Explain concepts
- Provide helpful information
- Maintain a simple conversation flow

---

### 📚 RAG Chat

RAG stands for **Retrieval-Augmented Generation**.

In RAG mode, the application reads information from:

```text
sample_docs/knowledge.txt

The user's question is sent to Groq together with the document content.

The AI is instructed to answer using the provided knowledge base.

🎨 Modern UI

The frontend includes:

Modern dark theme
Glassmorphism design
Responsive layout
AI chat interface
Basic Chat / RAG Chat mode selector
Animated typing indicator
Chat bubbles
New Conversation button
Clear Chat button
Model status
Knowledge-base status
Responsive mobile design
🛠️ Technologies Used
Technology	Purpose
Python	Backend programming
FastAPI	Web framework
Groq API	AI model inference
Jinja2	HTML templates
HTML5	Frontend structure
CSS3	UI styling
JavaScript	Frontend interaction
python-dotenv	Environment variables
Pydantic	Request validation
📁 Project Structure
groq_implementation/
│
├── main.py
├── .env
├── .env.example
├── .gitignore
├── README.md
├── requirements.txt
│
├── sample_docs/
│   └── knowledge.txt
│
├── static/
│   ├── style.css
│   └── script.js
│
└── templates/
    └── index.html
⚙️ Installation
1. Clone the Repository
git clone https://github.com/your-username/groq-ai-studio.git

Move into the project directory:

cd groq-ai-studio
2. Create Virtual Environment

Create a Python virtual environment:

python3 -m venv venv

Activate it on Linux/macOS:

source venv/bin/activate

For Windows:

venv\Scripts\activate
3. Install Dependencies

Install the required packages:

pip install -r requirements.txt

If requirements.txt is empty, install:

pip install fastapi uvicorn groq python-dotenv jinja2
🔐 Environment Variables

Create a .env file in the project root.

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
Important

Never upload your actual API key to GitHub.

Make sure .env is included in .gitignore:

.env
venv/
__pycache__/
🚀 Running the Application

Start the FastAPI server:

uvicorn main:app --reload --port 8001

The application will be available at:

http://127.0.0.1:8001

Open this address in your browser.

💬 Basic Chat

Select:

Basic Chat

Then type your question into the chat box.

Example:

What is machine learning?

The application sends the request to the Groq API and displays the AI response.

📚 RAG Chat

Select:

RAG Chat

The application loads:

sample_docs/knowledge.txt

The document is provided to the AI along with the user's question.

Example:

What information is available in the knowledge base?

The assistant will answer based on the document.

🔄 Application Flow
Basic Chat
User
  │
  ▼
Web Interface
  │
  ▼
FastAPI /api/chat
  │
  ▼
Groq API
  │
  ▼
AI Response
  │
  ▼
Web Interface
RAG Chat
User Question
      │
      ▼
Web Interface
      │
      ▼
FastAPI
      │
      ▼
knowledge.txt
      │
      ▼
Document + Question
      │
      ▼
Groq API
      │
      ▼
AI Response
      │
      ▼
Web Interface
🔌 API Endpoint

The application provides the following endpoint:

Chat
POST /api/chat

Request:

{
    "message": "What is artificial intelligence?",
    "mode": "basic"
}

RAG request:

{
    "message": "What does the knowledge base say about AI?",
    "mode": "rag"
}

Response:

{
    "reply": "AI is..."
}
🧠 RAG Architecture

The current RAG implementation uses a simple document-based approach.

knowledge.txt
      │
      ▼
Read Document
      │
      ▼
Combine Document + User Question
      │
      ▼
Groq LLM
      │
      ▼
Context-Based Answer

This makes the project a simple and understandable introduction to Retrieval-Augmented Generation.

📌 Configuration

The application uses the following configuration:

MODEL = os.getenv(
    "GROQ_MODEL",
    "openai/gpt-oss-20b"
)

Knowledge file:

KNOWLEDGE_FILE = "sample_docs/knowledge.txt"
🧪 Testing

After starting the server, test the application from the browser.

Basic Chat Test
Explain artificial intelligence in simple words.
RAG Test
What information is available in the knowledge document?
🛡️ Error Handling

The application handles common errors such as:

Empty user messages
Missing knowledge files
Groq API errors
Invalid chat modes

Example response:

{
    "reply": "Knowledge file not found."
}
📱 Responsive Design

The interface is designed to work across:

💻 Desktop
💻 Laptop
📱 Mobile
📟 Tablet
🔮 Future Improvements

The project can be extended with:

🔐 User authentication
👤 User profiles
💾 Chat history
📎 PDF document upload
📄 Multiple knowledge documents
🔍 Semantic search
🧠 Vector database
📊 AI usage analytics
🌙 Theme customization
🗂️ Conversation management
📥 Export conversations
⚡ Streaming AI responses
🎯 Learning Objectives

This project demonstrates practical implementation of:

FastAPI backend development
REST API creation
Groq API integration
Large Language Model interaction
RAG concepts
Environment variable management
Jinja2 templates
HTML/CSS/JavaScript frontend development
API-based frontend communication
Error handling
👨‍💻 Author

Your Name

AI / Data Science Developer

⭐ Project

If you find this project useful, consider giving it a ⭐ on GitHub.

📄 License

This project is created for educational and portfolio purposes.