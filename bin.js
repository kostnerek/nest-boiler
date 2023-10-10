#!/usr/bin/env node
import inquirer from 'inquirer';

const packageManager = {
  type: 'list',
  name: 'packageManager',
  message: 'Which package manager would you like to use?',
  choices: ['npm', 'yarn'],
  default: 'npm',
}

const projectName = {
  type: 'input',
  name: 'projectName',
  message: 'What is the name of your project?',
  default: 'nest-template',
  validate: (value) => {
    if (value.length) {
      return true;
    } else {
      return 'Please enter a project name';
    }
  },
}
const orm = {
  type: 'list',
  name: 'orm',
  message: 'Which ORM would you like to use?',
  choices: ['prisma', 'mongoose', 'none'],
  default: 'none',
}


inquirer
  .prompt([
    packageManager,
    projectName,
    orm,
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });