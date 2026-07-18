// =========================
// ThinkStep Server
// =========================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");


const app = express();

const PORT = 3000;


// =========================
// Middleware
// =========================

app.use(cors());

app.use(express.json());

app.use(express.static("public"));


// =========================
// Rate Limit
// =========================

const aiLimiter = rateLimit({

    windowMs: 60 * 1000,

    max: 30,

    message: {
        error: "Too many requests. Try again later."
    }

});


app.use("/hint", aiLimiter);


// =========================
// Status Check
// =========================

app.get("/status", (req, res) => {

    res.json({

        app: "ThinkStep",

        status: "running",

        ai: "Ollama"

    });

});


// =========================
// AI Chat
// =========================

app.post("/hint", async (req, res) => {


    const question = req.body.question;


    if(!question){

        return res.send(
            "Please ask a question."
        );

    }


    res.setHeader(
        "Content-Type",
        "text/plain"
    );


    try {


        const ollamaResponse = await axios({

            method: "post",

            url: "http://localhost:11434/api/generate",


            data: {

                model: "qwen2.5:7b",

                prompt:

`You are ThinkStep, a friendly AI tutor.

Rules:
- Explain step by step.
- Use simple language.
- Be helpful.
- Ask questions when teaching.

Student:
${question}`,

                stream: true

            },


            responseType: "stream"

        });



        ollamaResponse.data.on(
            "data",
            chunk => {


                const lines =
                chunk.toString()
                .split("\n")
                .filter(Boolean);



                lines.forEach(line => {


                    try {


                        const json =
                        JSON.parse(line);



                        if(json.response){

                            res.write(
                                json.response
                            );

                        }


                    }

                    catch(error){

                    }


                });


            });



        ollamaResponse.data.on(
            "end",
            () => {

                res.end();

            });


    }


    catch(error){


        console.log(
            "Ollama error:",
            error.message
        );


        res.status(500).send(

            "❌ Cannot connect to Ollama."

        );


    }


});


// =========================
// Start Server
// =========================

app.listen(PORT, () => {


    console.log(

        `💡 ThinkStep running at http://localhost:${PORT}`

    );


});
