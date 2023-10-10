import fs from 'fs';


export const moveMongoose = (projectName) => {
  fs.cp(
    './components/orm/mongoose/config',
    `./${projectName}/src/config`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    './components/orm/mongoose/app.module.ts',
    `./${projectName}/src/app.module.ts`,
    { recursive: true },
    ()=>{}
  )
}