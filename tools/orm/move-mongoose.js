import fs from 'fs';

export const moveMongoose = async (projectName, baseUrl) => {
  await fs.cp(
    baseUrl+'/components/orm/mongoose/config',
    `./${projectName}/src/config`,
    { recursive: true },
    ()=>{}
  );
  await fs.cp(
    baseUrl+'/components/orm/mongoose/app.module.ts',
    `./${projectName}/src/app.module.ts`,
    { recursive: true },
    ()=>{}
  )
}