// ======================================
// ThinkStep V2 Server
// ======================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");


const app = express();

const PORT = 3000;


// ======================================
// Middleware
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.static("public"));



// ======================================
// Rate Limit
// ======================================

const aiLimiter = rateLimit({

    windowMs: 60 * 1000,

    max: 100

});


app.use("/api/chat", aiLimiter);



// ======================================
// Status
// ======================================

app.get("/api/status", (req,res)=>{


    res.json({

        app:"ThinkStep",

        status:"running",

        ai:"Ollama"

    });


});




// ======================================
// AI Streaming Chat
// ======================================

app.post("/api/chat", async(req,res)=>{


    const question =
    req.body.question;



    if(!question){

        return res.status(400).json({

            error:"No question"

        });

    }



    try{


        const ollama =
        await axios({

            method:"POST",

            url:"http://127.0.0.1:11434/api/generate",


            responseType:"stream",


            data:{


                model:"qwen2.5:7b",


                prompt:`

You are ThinkStep, a friendly AI tutor.

Rules:
- Explain step by step.
- Use simple language.
- Keep answers helpful.
- Ask questions when teaching.

Student:
${question}

`,


                stream:true


            }


        });




        res.setHeader(

            "Content-Type",

            "text/plain"

        );


        res.setHeader(

            "Transfer-Encoding",

            "chunked"

        );




        ollama.data.on(

            "data",

            chunk=>{


                const lines =

                chunk.toString()

                .split("\n")

                .filter(Boolean);




                for(const line of lines){


                    try{


                        const json =
                        JSON.parse(line);



                        if(json.response){


                            res.write(

                                json.response

                            );


                        }


                    }

                    catch{}

                }


            }


        );




        ollama.data.on(

            "end",

            ()=>{


                res.end();


            }

        );




    }

    catch(error){


        console.log(

            "Ollama Error:",

            error.message

        );



        res.status(500).send(

            "❌ Ollama is not running."

        );


    }


});




// ======================================
// Start
// ======================================

app.listen(PORT,()=>{


    console.log(

        `💡 ThinkStep running on http://localhost:${PORT}`

    );


});