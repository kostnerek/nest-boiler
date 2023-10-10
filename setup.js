import fs from 'fs-extra';
import { mergeJsons } from './tools/merge-package-json.js';
import { ORMS } from './consts/orms.js';


const callback = (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success!');
  }
};

const handleOrm = (orm, projectName) => {
  const outputPath = `./${projectName}/package.json`;
  const basePackageJson = './base/package.json';
  console.log(orm, projectName)
  if (orm === ORMS.MONGOOSE) {
    mergeJsons(basePackageJson, './components/orm/mongoose/package.json', outputPath)
  }
  if (orm === ORMS.PRISMA) {
    mergeJsons(basePackageJson, './components/orm/prisma/package.json', outputPath)
  }
}

export async function setup(answers) {
  const { packageManager, projectName, orm } = answers;

  console.log('Creating project...')
  fs.mkdir(projectName);
  await fs.copy('./base', `./${projectName}`)
  handleOrm(orm, projectName)
  
}