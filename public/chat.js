// =========================
// ThinkStep Chat System
// =========================

let chats = JSON.parse(localStorage.getItem("thinkstepChats")) || [];

let currentChatId = null;


// =========================
// Save Chats
// =========================

function saveChats() {

    localStorage.setItem(
        "thinkstepChats",
        JSON.stringify(chats)
    );

}


// =========================
// New Chat
// =========================

function newChat() {

    const chat = {

        id: Date.now(),

        title: "New Chat",

        messages: []

    };


    chats.unshift(chat);

    currentChatId = chat.id;

    saveChats();

    renderChatList();

    renderCurrentChat();

}


// =========================
// Delete Chat
// =========================

function deleteChat(id) {

    if (!confirm("Delete this chat?")) return;

    chats = chats.filter(chat => chat.id !== id);

    saveChats();


    if (chats.length === 0) {

        newChat();
        return;

    }


    currentChatId = chats[0].id;

    renderChatList();

    renderCurrentChat();

}


// =========================
// Open Chat
// =========================

function openChat(id) {

    currentChatId = id;

    renderCurrentChat();

    renderChatList();

    if(typeof closeSidebars === "function"){

        closeSidebars();

    }

}

    currentChatId = id;

    renderCurrentChat();

    renderChatList();

}


// =========================
// Current Chat
// =========================

function getCurrentChat() {

    return chats.find(
        c => c.id === currentChatId
    );

}


// =========================
// Add Message
// =========================

function addMessage(role, text) {

    const chat = getCurrentChat();

    if (!chat) return;


    chat.messages.push({

        role,
        text

    });


    if (

        chat.title === "New Chat"

        &&

        role === "user"

    ) {

        chat.title =
            text.substring(0, 30);

    }


    saveChats();

    renderChatList();

    renderCurrentChat();

}


// =========================
// Render Chat
// =========================

function renderCurrentChat() {

    const container =
        document.getElementById("chat");

    if (!container) return;


    container.innerHTML = "";


    const chat =
        getCurrentChat();

    if (!chat) return;


    chat.messages.forEach(message => {

        const row =
            document.createElement("div");

        row.className =
            "message " + message.role;


        const bubble =
            document.createElement("div");

        bubble.className =
            "bubble";

        bubble.textContent =
            message.text;


        row.appendChild(bubble);

        container.appendChild(row);

    });


    container.scrollTop =
        container.scrollHeight;

}


// =========================
// Render Sidebar
// =========================

function renderChatList() {

    const list =
        document.getElementById("chatList");

    if (!list) return;

    list.innerHTML = "";


    chats.forEach(chat => {

        const row =
            document.createElement("div");

        row.className =
            "chat-row";


        const button =
            document.createElement("button");

        button.className =
            "chat-button";

        button.textContent =
            "💬 " + chat.title;

        button.onclick = () =>
            openChat(chat.id);


        const trash =
            document.createElement("button");

        trash.className =
            "delete-button";

        trash.textContent = "🗑";

        trash.onclick = (event) => {

            event.stopPropagation();

            deleteChat(chat.id);

        };


        row.appendChild(button);

        row.appendChild(trash);

        list.appendChild(row);

    });

}


// =========================
// Load
// =========================

function loadChats() {

    if (chats.length === 0) {

        newChat();

    } else {

        currentChatId =
            chats[0].id;

        renderChatList();

        renderCurrentChat();

    }

}