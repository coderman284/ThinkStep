// =========================
// ThinkStep AI Client
// Cloudflare Tunnel Connected
// =========================


const THINKSTEP_SERVER =
"https://fantastic-expects-beth-minimize.trycloudflare.com";



// =========================
// Send Question To AI
// =========================

async function askAI(question) {

    try {

        const response = await fetch(
            THINKSTEP_SERVER + "/hint",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        const answer = await response.text();


        if(answer) {

            return answer;

        }


        return "No response from ThinkStep.";

    }


    catch(error) {

        console.error(
            "ThinkStep AI Error:",
            error
        );


        return "❌ Cannot connect to ThinkStep AI.";

    }

}



// =========================
// Check ThinkStep Status
// =========================

async function checkThinkStepStatus() {


    const status =
    document.getElementById("status");


    try {


        const response =
        await fetch(
            THINKSTEP_SERVER + "/status"
        );


        if(response.ok) {


            if(status) {

                status.innerHTML =
                "🟢 Online";

            }


            return true;

        }


        throw new Error("Server error");


    }


    catch(error) {


        console.error(
            "Status Error:",
            error
        );


        if(status) {

            status.innerHTML =
            "🔴 Offline";

        }


        return false;

    }

}



// Check status when page loads

window.addEventListener(
"DOMContentLoaded",
()=>{

    checkThinkStepStatus();

});
