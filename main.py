import os
from dotenv import load_dotenv
from groq import Groq

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from pydantic import BaseModel


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")

MODEL = os.getenv(
    "GROQ_MODEL",
    "openai/gpt-oss-20b"
)

KNOWLEDGE_FILE = "sample_docs/knowledge.txt"


# ============================================================
# GROQ CLIENT
# ============================================================

client = Groq(
    api_key=API_KEY
)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Groq AI Studio"
)


# ============================================================
# STATIC FILES
# ============================================================

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)


# ============================================================
# TEMPLATES
# ============================================================

templates = Jinja2Templates(
    directory="templates"
)


# ============================================================
# REQUEST MODEL
# ============================================================

class ChatRequest(BaseModel):

    message: str
    mode: str = "basic"


# ============================================================
# HOME PAGE
# ============================================================

@app.get(
    "/",
    response_class=HTMLResponse
)
async def home(request: Request):

    return templates.TemplateResponse(
        request,
        "index.html",
        {}
    )


# ============================================================
# CHAT API
# ============================================================

@app.post("/api/chat")
async def chat(request: ChatRequest):

    question = request.message.strip()


    # --------------------------------------------------------
    # EMPTY MESSAGE
    # --------------------------------------------------------

    if not question:

        return {
            "reply": "Please enter a message."
        }


    # ========================================================
    # BASIC CHAT
    # ========================================================

    if request.mode == "basic":

        try:

            response = client.chat.completions.create(

                model=MODEL,

                messages=[
                    {
                        "role": "system",
                        "content":
                            "You are a helpful assistant."
                    },

                    {
                        "role": "user",
                        "content": question
                    }
                ]
            )


            reply = response.choices[0].message.content


            return {
                "reply": reply
            }


        except Exception as e:

            return {
                "reply": f"Groq API Error: {str(e)}"
            }


    # ========================================================
    # RAG CHAT
    # ========================================================

    if request.mode == "rag":

        try:

            with open(
                KNOWLEDGE_FILE,
                encoding="utf-8"
            ) as file:

                document = file.read()


        except FileNotFoundError:

            return {
                "reply":
                    "Knowledge file not found. "
                    "Please check sample_docs/knowledge.txt"
            }


        try:

            response = client.chat.completions.create(

                model=MODEL,

                messages=[
                    {
                        "role": "system",
                        "content":
                            """
You are a helpful knowledge-base assistant.

Answer the user's question using ONLY
the provided document.

If the answer is not available in the
document, say:

"The information is not available
in the knowledge base."
"""
                    },

                    {
                        "role": "user",
                        "content":
                            f"""
KNOWLEDGE DOCUMENT:

{document}


QUESTION:

{question}
"""
                    }
                ]
            )


            reply = response.choices[0].message.content


            return {
                "reply": reply
            }


        except Exception as e:

            return {
                "reply": f"Groq API Error: {str(e)}"
            }


    # ========================================================
    # INVALID MODE
    # ========================================================

    return {
        "reply": "Invalid chat mode."
    }