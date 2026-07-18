// ======================================
// ThinkStep V2 AI Client
// ======================================


async function askAIStream(question, onChunk) {


    try {


        const response = await fetch(
            "/api/chat",
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



        if (!response.ok) {

            throw new Error(
                "AI server error"
            );

        }




        const reader =
        response.body.getReader();



        const decoder =
        new TextDecoder();



        while (true) {


            const {
                done,
                value
            } =
            await reader.read();



            if (done) {

                break;

            }



            const text =
            decoder.decode(
                value
            );



            if (text) {


                onChunk(text);


            }


        }



    }

    catch(error) {


        console.log(
            "AI Error:",
            error
        );


        onChunk(
            "❌ Cannot connect to ThinkStep."
        );


    }


}