#! /usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const questions = require("./helpers/questions");
const createProject = require("./helpers/createProject");

const buildConfig = async () => {
  const answers = await inquirer.prompt(questions);
  createProject(answers);
};
if (fs.readdirSync(process.cwd()).length !== 0) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: "Directory is not empty! Would you like to overwrite it?",
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log("Goodbye.");
        process.exit(0);
      }
    });
} else {
  buildConfig();
}
