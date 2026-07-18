// =========================
// ThinkStep AI Client
// Cloudflare Tunnel Connected
// =========================


const THINKSTEP_SERVER =
"https://biotechnology-lasting-dept-reuters.trycloudflare.com";



// =========================
// Ask AI
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



        const answer =
        await response.text();



        if(answer){

            return answer;

        }



        return "No response received.";

    }



    catch(error){


        console.log(

            "ThinkStep AI Error:",

            error

        );


        return "❌ Cannot connect to ThinkStep AI.";

    }


}



// =========================
// Check Server Status
// =========================

async function checkThinkStepStatus(){


    try {


        const response =
        await fetch(
            THINKSTEP_SERVER + "/status"
        );


        if(response.ok){


            const data =
            await response.json();



            const status =
            document.getElementById("status");



            if(status){

                status.innerHTML =
                "🟢 Online";

            }


            return data;


        }


    }


    catch(error){


        const status =
        document.getElementById("status");



        if(status){

            status.innerHTML =
            "🔴 Offline";

        }


    }


}



// Start status check

window.addEventListener(
"DOMContentLoaded",
()=>{

    checkThinkStepStatus();

});
