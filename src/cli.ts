import { ParseArgs } from './utils/ParseArgs';
import { HandleTemplateFuncs } from './main';

export const cli = async (rowArgs: string[]) => {
  const args = await ParseArgs(rowArgs);
  await HandleTemplateFuncs(args.template);
};
