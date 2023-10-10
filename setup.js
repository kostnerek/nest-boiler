import fs from 'fs-extra';
import { mergeJsons } from './tools/merge-package-json.js';
import { ORMS } from './consts/orms.js';
import { movePrisma } from './tools/orm/move-prisma.js';
import { moveMongoose } from './tools/orm/move-mongoose.js';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PACKAGE_MANAGERS } from './consts/package-managers.js';
const BASE_URL = dirname(fileURLToPath(import.meta.url));


const handleOrm = (orm, projectName) => {
  const outputPath = `${BASE_URL}/${projectName}/package.json`;
  const basePackageJson = BASE_URL+'/base/package.json';
  console.log(orm, projectName)
  if (orm === ORMS.MONGOOSE) {
    mergeJsons(basePackageJson, BASE_URL+'/components/orm/mongoose/package.json', outputPath)
    moveMongoose(projectName, BASE_URL)
  }
  if (orm === ORMS.PRISMA) {
    mergeJsons(basePackageJson, BASE_URL+'/components/orm/prisma/package.json', outputPath)
    movePrisma(projectName, BASE_URL)
  }
}

const handlePackageManager = (packageManager) => {
  if (packageManager === PACKAGE_MANAGERS.NPM) {
    exec(`cd ${BASE_URL} && npm i`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      console.log(stdout);
    })
  }
  if (packageManager === PACKAGE_MANAGERS.YARN) {
    exec(`yarn install --cwd ${BASE_URL}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      console.log(stdout);
    })
  }
}

export async function setup(answers) {
  const { packageManager, projectName, orm } = answers;

  console.log('Creating project...')
  console.log(BASE_URL+'/base', `${projectName}`)
  await fs.copy(BASE_URL+'/base', `${projectName}`)
  handleOrm(orm, projectName)
  handlePackageManager(packageManager)
}