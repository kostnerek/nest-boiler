import fs from 'fs';
import { BASE_URL } from '../base-url';

export const moveMongoose = (projectName) => {
  fs.cp(
    BASE_URL+'/components/orm/mongoose/config',
    `./${projectName}/src/config`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    BASE_URL+'./components/orm/mongoose/app.module.ts',
    `./${projectName}/src/app.module.ts`,
    { recursive: true },
    ()=>{}
  )
}