#!/usr/bin/env node
import inquirer from 'inquirer';
import { setup } from './setup.js';
import { PACKAGE_MANAGERS } from './consts/package-managers.js';
import { ORMS } from './consts/orms.js';

const packageManager = {
  type: 'list',
  name: 'packageManager',
  message: 'Which package manager would you like to use?',
  choices: Object.values(PACKAGE_MANAGERS),
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
  choices: Object.values(ORMS),
  default: 'mongoose',
}


inquirer
  .prompt([
    packageManager,
    projectName,
    orm,
  ])
  .then((answers) => {
    setup(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });