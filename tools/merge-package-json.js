import fs from 'fs';

export function mergeJsons(packageJsonPath1, packageJsonPath2, outputPath) {
  try {
    // Read the content of the first package.json file
    const packageJson1Content = fs.readFileSync(packageJsonPath1, 'utf8');
    const packageJson1 = JSON.parse(packageJson1Content);

    // Read the content of the second package.json file
    const packageJson2Content = fs.readFileSync(packageJsonPath2, 'utf8');
    const packageJson2 = JSON.parse(packageJson2Content);

    // Merge dependencies and devDependencies
    const mergedPackageJson = {
      ...packageJson1,
      dependencies: { ...packageJson1.dependencies, ...packageJson2.dependencies },
      devDependencies: { ...packageJson1.devDependencies, ...packageJson2.devDependencies }
    };

    const mergedJson = JSON.stringify(mergedPackageJson, null, 2);

    fs.writeFileSync(outputPath, mergedJson, 'utf8', { flag: 'w' });

    

    console.log('Dependencies merged successfully.');
  } catch (error) {
    console.error('Error merging dependencies:', error);
  }
}