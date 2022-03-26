import execa from 'execa';
import fs from 'fs';

export const InstallDependence = async ({
  templateDirectory,
}: {
  templateDirectory: string;
}) => {
  execa.sync('yarn', ['init', '-y']);

  const packageStr = fs.readFileSync(
    templateDirectory + '/package.json',
    'utf8',
  );
  const packageJson = JSON.parse(packageStr);
  if (packageJson.dependencies) {
    for (const dependence in packageJson.dependencies) {
      await execa('yarn', ['add', dependence]);
    }
  }
  return;
};
