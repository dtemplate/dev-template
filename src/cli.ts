import { ParseArgs } from './utils/ParseArgs';
import { GetTemplates } from './utils/GetTemplates';

export const cli = async (rowArgs: string[]) => {
  const args = await ParseArgs(rowArgs);
  const { templates } = await GetTemplates();
  console.log(templates);
  console.log(args);
};
