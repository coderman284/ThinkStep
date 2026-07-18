// =========================
// ThinkStep AI Client
// =========================

async function askAI(question) {

    try {

        const response = await fetch(
            "https://literally-boutique-big-compound.trycloudflare.com/hint",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        const text = await response.text();

        return text || "No response.";

    }


    catch(error){

        console.log(
            "AI error:",
            error
        );

        return "❌ Cannot connect to ThinkStep.";

    }

}
