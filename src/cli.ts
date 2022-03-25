import { ParseArgs } from './utils/ParseArgs';
import { RequestTemplates } from './utils/RequestTemplates';

export const cli = async (rowArgs: string[]) => {
  const args = await ParseArgs(rowArgs);
  const { templates } = await RequestTemplates();
  console.log(templates);
  console.log(args);
};
