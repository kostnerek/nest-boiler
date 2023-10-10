import fs from 'fs';

export const movePrisma = (projectName, baseUrl) => {
  fs.cp(
    baseUrl+'./components/orm/prisma/config',
    `./${projectName}/src/config`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    baseUrl+'/components/orm/prisma/prisma',
    `./${projectName}/prisma`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    baseUrl+'/components/orm/prisma/database',
    `./${projectName}/src/database`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    baseUrl+'/components/orm/prisma/app.module.ts',
    `./${projectName}/src/app.module.ts`,
    { recursive: true },
    ()=>{}
  );
}