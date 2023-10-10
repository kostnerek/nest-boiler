import fs from 'fs';
import { BASE_URL } from '../base-url';

export const movePrisma = (projectName) => {
  fs.cp(
    BASE_URL+'./components/orm/prisma/config',
    `./${projectName}/src/config`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    BASE_URL+'./components/orm/prisma/prisma',
    `./${projectName}/prisma`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    BASE_URL+'./components/orm/prisma/database',
    `./${projectName}/src/database`,
    { recursive: true },
    ()=>{}
  );
  fs.cp(
    BASE_URL+'./components/orm/prisma/app.module.ts',
    `./${projectName}/src/app.module.ts`,
    { recursive: true },
    ()=>{}
  );
}