import fs from 'fs-extra';
import { mergeJsons } from './tools/merge-package-json.js';
import { ORMS } from './consts/orms.js';
import { movePrisma } from './tools/orm/move-prisma.js';
import { moveMongoose } from './tools/orm/move-mongoose.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


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
    moveMongoose(projectName)
  }
  if (orm === ORMS.PRISMA) {
    mergeJsons(basePackageJson, './components/orm/prisma/package.json', outputPath)
    movePrisma(projectName)
  }
}

export async function setup(answers) {
  const { packageManager, projectName, orm } = answers;



// Get the directory of the current module (script)
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  console.log(scriptDir)

  console.log('Creating project...')
  fs.mkdir(projectName);
  await fs.copy('./base', `./${projectName}`)
  handleOrm(orm, projectName)
  
}