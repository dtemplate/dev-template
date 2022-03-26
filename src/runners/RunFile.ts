import { IMainFunction } from '../interfaces/ITemplate';

export const RunFile = async ({
  filePath,
  templateDirectory,
}: {
  filePath: string;
  templateDirectory: string;
}) => {
  const { main }: IMainFunction = require(filePath);
  await main({ rootDirectory: process.cwd(), templateDirectory });
  return;
};
