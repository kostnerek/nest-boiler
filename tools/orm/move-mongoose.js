import fs from 'fs';

export const moveMongoose = (projectName, baseUrl) => {
  fs.cp(
    baseUrl+'/components/orm/mongoose/config',
    `./${projectName}/src/config`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    baseUrl+'/components/orm/mongoose/app.module.ts',
    `./${projectName}/src/app.module.ts`,
    { recursive: true },
    ()=>{}
  )
}