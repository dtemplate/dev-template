import { IMainFunction } from '../interfaces/ITemplate';

export const RunFile = async ({
  filePath,
  templateDirectory,
  rootDirectory,
}: {
  filePath: string;
  templateDirectory: string;
  rootDirectory?: string;
}) => {
  const { main }: IMainFunction = require(filePath);
  await main({
    rootDirectory: rootDirectory ? rootDirectory : process.cwd(),
    templateDirectory,
  });
  return;
};
