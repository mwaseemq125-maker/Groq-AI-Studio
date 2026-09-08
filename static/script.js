// ============================================================
// GROQ AI STUDIO - FRONTEND
// ============================================================


let currentMode = "basic";


// ============================================================
// ELEMENTS
// ============================================================

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

const basicMode = document.getElementById("basicMode");
const ragMode = document.getElementById("ragMode");

const currentModeText = document.getElementById("currentMode");
const ragStatus = document.getElementById("ragStatus");

const clearChat = document.getElementById("clearChat");
const newChatBtn = document.getElementById("newChatBtn");


// ============================================================
// MODE SWITCH
// ============================================================

function setMode(mode) {

    currentMode = mode;

    basicMode.classList.remove("active");
    ragMode.classList.remove("active");

    if (mode === "basic") {

        basicMode.classList.add("active");

        currentModeText.textContent = "Basic Chat";

        ragStatus.innerHTML =
            '<i class="fa-solid fa-message"></i> General AI mode';

    } else {

        ragMode.classList.add("active");

        currentModeText.textContent = "RAG Chat";

        ragStatus.innerHTML =
            '<i class="fa-solid fa-book"></i> Knowledge enabled';
    }
}


basicMode.addEventListener(
    "click",
    () => setMode("basic")
);


ragMode.addEventListener(
    "click",
    () => setMode("rag")
);


// ============================================================
// ADD MESSAGE
// ============================================================

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className =
        `message ${sender}`;

    const avatar = document.createElement("div");

    avatar.className = "message-avatar";

    if (sender === "ai") {

        avatar.innerHTML =
            '<i class="fa-solid fa-bolt"></i>';

    } else {

        avatar.textContent = "You";
    }


    const content = document.createElement("div");

    content.className = "message-content";


    const bubble = document.createElement("div");

    bubble.className = "message-bubble";

    bubble.textContent = text;


    const time = document.createElement("div");

    time.className = "message-time";

    time.textContent = getTime();


    content.appendChild(bubble);
    content.appendChild(time);


    if (sender === "user") {

        message.appendChild(content);
        message.appendChild(avatar);

    } else {

        message.appendChild(avatar);
        message.appendChild(content);
    }


    messages.appendChild(message);

    scrollToBottom();
}


// ============================================================
// TIME
// ============================================================

function getTime() {

    const now = new Date();

    return now.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


// ============================================================
// SCROLL
// ============================================================

function scrollToBottom() {

    messages.scrollTop =
        messages.scrollHeight;
}


// ============================================================
// REMOVE WELCOME
// ============================================================

function removeWelcome() {

    const welcome =
        document.querySelector(".welcome-message");

    if (welcome) {
        welcome.remove();
    }
}


// ============================================================
// SEND MESSAGE
// ============================================================

async function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) {
        return;
    }


    removeWelcome();

    addMessage(text, "user");


    messageInput.value = "";

    messageInput.style.height = "auto";


    sendBtn.disabled = true;

    typing.classList.add("show");

    scrollToBottom();


    try {

        /*
         * Your FastAPI backend should expose:
         *
         * POST /api/chat
         *
         * Body:
         * {
         *     "message": "...",
         *     "mode": "basic"
         * }
         */


        const response = await fetch(
            "/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    message: text,
                    mode: currentMode
                })
            }
        );


        if (!response.ok) {
            throw new Error(
                "Server error"
            );
        }


        const data =
            await response.json();


        typing.classList.remove("show");

        addMessage(
            data.reply || "No response received.",
            "ai"
        );


    } catch (error) {

        typing.classList.remove("show");

        addMessage(
            "Unable to connect with the Groq server. Please check your API configuration.",
            "ai"
        );

        console.error(error);

    }


    sendBtn.disabled = false;

    messageInput.focus();
}


// ============================================================
// SEND BUTTON
// ============================================================

sendBtn.addEventListener(
    "click",
    sendMessage
);


// ============================================================
// ENTER KEY
// ============================================================

messageInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);


// ============================================================
// AUTO RESIZE
// ============================================================

messageInput.addEventListener(
    "input",
    function () {

        this.style.height = "auto";

        this.style.height =
            Math.min(
                this.scrollHeight,
                120
            ) + "px";
    }
);


// ============================================================
// SUGGESTIONS
// ============================================================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "suggestion"
            )
        ) {

            messageInput.value =
                event.target.textContent;

            messageInput.focus();

            messageInput.dispatchEvent(
                new Event("input")
            );
        }

    }
);


// ============================================================
// CLEAR CHAT
// ============================================================

clearChat.addEventListener(
    "click",
    function () {

        messages.innerHTML = `
            <div class="welcome-message">

                <div class="welcome-icon">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                </div>

                <h3>
                    Hello! How can I help?
                </h3>

                <p>
                    Ask me anything or switch to RAG mode
                    to search your knowledge base.
                </p>

                <div class="suggestions">

                    <button class="suggestion">
                        Explain machine learning
                    </button>

                    <button class="suggestion">
                        What is RAG?
                    </button>

                    <button class="suggestion">
                        Summarize my knowledge
                    </button>

                </div>

            </div>
        `;
    }
);


// ============================================================
// NEW CHAT
// ============================================================

newChatBtn.addEventListener(
    "click",
    function () {

        clearChat.click();

        setMode("basic");

        messageInput.focus();
    }
);


// ============================================================
// MOBILE SIDEBAR
// ============================================================

const mobileMenu =
    document.getElementById("mobileMenu");


mobileMenu.addEventListener(
    "click",
    function () {

        document
            .querySelector(".sidebar")
            .classList.toggle("open");
    }
);