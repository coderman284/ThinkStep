// =========================
// ThinkStep AI Client
// Cloudflare Tunnel Connected
// =========================


async function askAI(question) {


    try {


        const response = await fetch(

            "https://apt-erp-cache-mounts.trycloudflare.com/hint",

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
