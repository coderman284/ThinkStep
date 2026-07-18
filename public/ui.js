// ======================================
// ThinkStep V2 UI Helpers
// ======================================



// =========================
// Smooth typing dots
// =========================

let typingInterval;


function startTypingAnimation(){


    const typing =
    document.getElementById("typing");


    if(!typing) return;



    let dots = 0;



    typingInterval =
    setInterval(()=>{


        dots++;


        if(dots > 3){

            dots = 0;

        }



        typing.innerHTML = `

        <div class="bubble">

        💡 Thinking${".".repeat(dots)}

        </div>

        `;


    },400);



}



function stopTypingAnimation(){


    clearInterval(
        typingInterval
    );


}





// =========================
// Button animation
// =========================


document.addEventListener(
"DOMContentLoaded",
()=>{


    document
    .querySelectorAll("button")
    .forEach(button=>{


        button.addEventListener(
        "mousedown",
        ()=>{


            button.style.transform =
            "scale(0.95)";


        });


        button.addEventListener(
        "mouseup",
        ()=>{


            button.style.transform =
            "scale(1)";


        });


    });



});