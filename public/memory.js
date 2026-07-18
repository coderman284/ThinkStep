// =========================
// ThinkStep Memory System
// =========================


function saveMemory(){


    const memory = {

        name:
        document.getElementById(
            "studentName"
        ).value,


        grade:
        document.getElementById(
            "studentGrade"
        ).value,


        style:
        document.getElementById(
            "learningStyle"
        ).value

    };



    localStorage.setItem(

        "thinkstepMemory",

        JSON.stringify(memory)

    );


    alert(
        "💡 ThinkStep remembers you!"
    );


}




function loadMemory(){


    const saved =

    localStorage.getItem(
        "thinkstepMemory"
    );



    if(!saved)
        return;



    const memory =
    JSON.parse(saved);



    document.getElementById(
        "studentName"
    ).value =
    memory.name || "";



    document.getElementById(
        "studentGrade"
    ).value =
    memory.grade || "";



    document.getElementById(
        "learningStyle"
    ).value =
    memory.style ||
    "Simple explanations";


}




function getMemoryText(){


    const saved =

    localStorage.getItem(
        "thinkstepMemory"
    );



    if(!saved){

        return "No student profile.";

    }



    const memory =
    JSON.parse(saved);



    return `

Student name:
${memory.name || "Unknown"}

Grade:
${memory.grade || "Unknown"}

Learning style:
${memory.style || "Simple explanations"}

`;

}