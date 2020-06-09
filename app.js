const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array for employees
let employeeArray = [];

// prompt user for manager
let promptManager = () => { return inquirer.prompt([
        {
            type: "input",
            message: "Name of the mananger?",
            name: "name"
        },
        {
            type: "input",
            message: "Type in ID number: ",
            name: "id"
        },
        {
            type: "input",
            message: "Type in email: ",
            name: "email"
        },
        {
            type: "input",
            message: "Type in office number: ",
            name: "officeNumber"
        },
        {
            type: "list",
            message: "Do you want to add more employees?",
            choices: ["Intern", "Engineer", "No more employees"],
            name: "choice",

        }
    ]);
}

let promptIntern = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Name of the Intern?",
            name: "name"
        },
        {
            type: "input",
            message: "Type in ID number: ",
            name: "id"
        },
        {
            type: "input",
            message: "Type in email: ",
            name: "email"
        },
        {
            type: "input",
            message: "Type in school: ",
            name: "school"
        },
        {
            type: "list",
            message: "Do you want to add more employees?",
            choices: ["Intern", "Engineer", "No more employees"],
            name: "choice",

        }
    ]);

}

let promptEngineer = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Name of the Engineer?",
            name: "name"
        },
        {
            type: "input",
            message: "Type in ID number: ",
            name: "id"
        },
        {
            type: "input",
            message: "Type in email: ",
            name: "email"
        },
        {
            type: "input",
            message: "Type in Github name: ",
            name: "github"
        },
        {
            type: "list",
            message: "Do you want to add more employees?",
            choices: ["Intern", "Engineer", "No more employees"],
            name: "choice",

        }
    ]);

}

// // testing the html workaround
// // TEST: WORKS! hallelujah
// promptManager().then(answers => {
//     // create manager obj from the inquirer text
//     let manager = new Manager(answers.name
//         ,answers.id 
//         ,answers.email 
//         ,answers.officeNumber);
//     console.log(manager);

//     // push to the employee array
//     employeeArray.push(manager);

//     // retrieve html block and put it into a variable (htmlText)
//     let htmlText = render(employeeArray);

//     // write to the output folder
//     return fs.writeFileSync(outputPath, htmlText);
// })
// // if there is an error, catch and throw it
// .catch(function (err) {
//     console.log(err);
// });

async function questionsLoop () {
    // condition to continue the for loop
    let donewith = false;

    // manager will be asked first, so call promptManager()
    let res = await promptManager();

    // once we get the info for promptManager(), we'll create/initialize
    // the Manager obj and push it to our employeeArray
    let manager = new Manager(res.name,
        res.id,
        res.email,
        res.officeNumber);
    employeeArray.push(manager);
    
    // afterwards, we now check the answer to see whether we'll add more employees to our page
    //
    // while we're not done with our loop (!donewith), we'll see if the added employee is either an intern or engineer
    while (!donewith) {

        // if it is an intern, we create/initialize an Intern obj. and push it to the employeeArray
        if (res.choice === "Intern") {
            // we'll continue to use the res variable to retrive the inquirer return objects.
            res = await promptIntern();
            // initialize Intern obj.
            let intern = new Intern(res.name,
                res.id,
                res.email,
                res.school);
            // push to employeeArray
            employeeArray.push(intern);
        }
        // if it is an engineer, we create/initialize an Engineer obj. and push it to the employeeArray
        else if (res.choice === "Engineer") {
            res = await promptEngineer();
            // initialize Engineer obj.
            let engineer = new Engineer(res.name,
                res.id,
                res.email,
                res.github);
            // push to employeeArray
            employeeArray.push(engineer);
        }
        else if (res.choice === "No more employees") {
            donewith = true;
            console.log(employeeArray);
            
        }

    }

    // once done,
    // retrieve html block and put it into a variable (htmlText)
    let htmlText = render(employeeArray);

    // write to the output folder
    return fs.writeFileSync(outputPath, htmlText);

    
}

// call the questions loop
questionsLoop();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
