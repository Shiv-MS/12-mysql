const inq = require("inquirer")
const connection = require("./assets/db/connection.js")


function startingQuestions() {
    inq.prompt(
        {
            type: "list",
            name:"startingQuestions",
            message: "Please choose an option",
            choices
        }
    )
}

