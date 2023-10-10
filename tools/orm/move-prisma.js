import fs from 'fs';

export const movePrisma = (projectName) => {
  fs.cp(
    './components/orm/prisma/config',
    `./${projectName}/src/config`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    './components/orm/prisma/prisma',
    `./${projectName}/prisma`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    './components/orm/prisma/database',
    `./${projectName}/src/database`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    './components/orm/prisma/app.module.ts',
    `./${projectName}/src/app.module.ts`,
    { recursive: true },
    ()=>{}
  );
}