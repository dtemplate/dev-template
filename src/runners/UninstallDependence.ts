import execa from 'execa';
import fs from 'fs';

export const UninstallDependence = async ({
  templateDirectory,
}: {
  templateDirectory: string;
}) => {
  const packageStr = fs.readFileSync(
    templateDirectory + '/package.json',
    'utf8',
  );
  const packageJson = JSON.parse(packageStr);
  if (packageJson.dependencies) {
    for (const dependence in packageJson.dependencies) {
      await execa('yarn', ['remove', dependence]);
    }
  }
  return;
};
