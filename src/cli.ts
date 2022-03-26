import { ParseArgs } from './utils/ParseArgs';
import { HandleTemplateFuncs } from './main';

export const cli = async (rowArgs: string[]) => {
  const args = await ParseArgs(rowArgs);

  if (args.run) {
    await HandleTemplateFuncs({
      templateName: args.template,
      templateDirectory: args.run,
      rootDirectory: `${process.cwd()}/output`,
    });
    return;
  }

  if (!args.template) throw new Error(`Please use --template {template-name}`);

  await HandleTemplateFuncs({
    templateName: args.template,
  });

  return;
};
