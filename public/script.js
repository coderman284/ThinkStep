// ======================================
// ThinkStep V2 Main Script
// ======================================


let chats =
JSON.parse(
    localStorage.getItem("thinkstep_chats")
) || [];


let currentChat = 0;



// ======================================
// Start
// ======================================

document.addEventListener(
"DOMContentLoaded",
()=>{


    console.log(
        "💡 ThinkStep V2 loaded"
    );



    if(chats.length === 0){

        createChat();

    }



    loadChat();

    updateChatList();

    setupButtons();

    loadProfile();

    checkStatus();


});




// ======================================
// Buttons
// ======================================

function setupButtons(){



document
.getElementById("sendBtn")
.onclick =
sendMessage;




document
.getElementById("newChatBtn")
.onclick =
createChat;





document
.getElementById("question")
.addEventListener(
"keydown",
(e)=>{


    if(e.key === "Enter"){

        sendMessage();

    }


});





document
.querySelectorAll(".subjects button")
.forEach(button=>{


    button.onclick = ()=>{


        document
        .getElementById("question")
        .value =

        `Teach me ${button.dataset.subject} step by step.`;


    };


});





document
.getElementById("editProfileBtn")
.onclick =
()=>{


document
.getElementById("profileEditor")
.classList
.remove("hidden");


};





document
.getElementById("saveProfileBtn")
.onclick =
saveProfile;





document
.getElementById("themeBtn")
.onclick =
()=>{


document.body
.classList
.toggle("dark");


};


}




// ======================================
// Send Message
// ======================================

async function sendMessage(){


const input =
document.getElementById("question");


const text =
input.value.trim();



if(!text) return;



input.value = "";



const chat =
chats[currentChat];



chat.messages.push({

role:"user",

text:text

});



saveChats();

loadChat();





const aiMessage = {


role:"ai",

text:""


};



chat.messages.push(
aiMessage
);


showTyping();


await askAIStream(

text,

(chunk)=>{


removeTyping();


aiMessage.text += chunk;


loadChat();


}

);



saveChats();


updateChatList();



}





// ======================================
// Chat Creation
// ======================================


function createChat(){


chats.push({

name:"New Chat",

messages:[]

});



currentChat =
chats.length - 1;



saveChats();

loadChat();

updateChatList();


}




// ======================================
// Display Chat
// ======================================


function loadChat(){


const box =
document.getElementById("chat");


if(!box) return;



box.innerHTML="";



const chat =
chats[currentChat];



chat.messages.forEach(msg=>{


const div =
document.createElement("div");


div.className =
"message " + msg.role;



div.innerHTML = `

<div class="bubble">

${msg.text}

</div>

`;



box.appendChild(div);



});



box.scrollTop =
box.scrollHeight;


}




// ======================================
// Chat List
// ======================================


function updateChatList(){


const list =
document.getElementById("chatList");


list.innerHTML="";



chats.forEach((chat,index)=>{


const row =
document.createElement("div");


row.className="chat-row";



const button =
document.createElement("button");


button.innerText =
chat.name;


button.onclick =
()=>{


currentChat=index;

loadChat();


};





const del =
document.createElement("button");


del.innerText="🗑️";



del.onclick =
()=>{


chats.splice(index,1);



if(chats.length===0){

createChat();

return;

}



currentChat=0;


saveChats();

loadChat();

updateChatList();


};




row.appendChild(button);

row.appendChild(del);


list.appendChild(row);



});



}




// ======================================
// Typing
// ======================================


function showTyping(){


const box =
document.getElementById("chat");



const div =
document.createElement("div");


div.id="typing";


div.className="message ai";


div.innerHTML = `

<div class="bubble">

💡 Thinking...

</div>

`;



box.appendChild(div);


}




function removeTyping(){


const typing =
document.getElementById("typing");


if(typing){

typing.remove();

}


}





// ======================================
// Storage
// ======================================


function saveChats(){


localStorage.setItem(

"thinkstep_chats",

JSON.stringify(chats)

);


}





// ======================================
// Profile
// ======================================


function loadProfile(){


const name =
localStorage.getItem(
"thinkstep_profile"
)
||
"Student";



document
.getElementById("profileName")
.innerText=name;


}




function saveProfile(){


const input =
document.getElementById("profileInput");


if(input.value.trim()){


localStorage.setItem(

"thinkstep_profile",

input.value.trim()

);



loadProfile();


document
.getElementById("profileEditor")
.classList
.add("hidden");


}



}





// ======================================
// Status
// ======================================


async function checkStatus(){


try{


const res =
await fetch("/api/status");



const data =
await res.json();



document
.getElementById("status")
.innerText =
"🟢 Online";


}

catch{


document
.getElementById("status")
.innerText =
"🔴 Offline";


}



}