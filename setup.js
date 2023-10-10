import fs from 'fs-extra';
import { mergeJsons } from './tools/merge-package-json.js';
import { ORMS } from './consts/orms.js';
import { movePrisma } from './tools/orm/move-prisma.js';
import { moveMongoose } from './tools/orm/move-mongoose.js';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PACKAGE_MANAGERS } from './consts/package-managers.js';
const BASE_URL = dirname(fileURLToPath(import.meta.url));


const handleOrm = async (orm, projectName) => {
  const outputPath = `${BASE_URL}/${projectName}/package.json`;
  const basePackageJson = BASE_URL+'/base/package.json';
  console.log(orm, projectName)
  if (orm === ORMS.MONGOOSE) {
    mergeJsons(basePackageJson, BASE_URL+'/components/orm/mongoose/package.json', outputPath)
    await moveMongoose(projectName, BASE_URL)
  }
  if (orm === ORMS.PRISMA) {
    mergeJsons(basePackageJson, BASE_URL+'/components/orm/prisma/package.json', outputPath)
    await movePrisma(projectName, BASE_URL)
  }
}

const handlePackageManager = (packageManager, projectName) => {
  let cmd = '';
  let args = [];
  if (packageManager === PACKAGE_MANAGERS.NPM) {
    cmd = 'npm';
    args = ['--prefix', projectName, 'install'];
  }
  if (packageManager === PACKAGE_MANAGERS.YARN) {
    cmd = 'yarn';
    args = ['--cwd', projectName];
  }
  const proc = spawn(cmd, args);
  console.log('🔥Don\'t worry if it looks stuck (maybe it works)🔥')
  proc.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
  proc.stderr.on('data', (data) => {
    console.error(`${data}`);
  });
}

export async function setup(answers) {
  const { packageManager, projectName, orm } = answers;

  console.log('Creating project...')
  console.log(BASE_URL+'/base', `${projectName}`)
  await fs.copy(BASE_URL+'/base', `${projectName}`)
  await handleOrm(orm, projectName)
  console.log(fs.existsSync(`${projectName}/package.json`))
  console.log('Installing dependencies...')
  handlePackageManager(packageManager, projectName)
}