import arg from 'arg';

export const ParseArgs = async (rowArgs: string[]) => {
  const args = arg(
    {
      '--template': String,
    },
    {
      argv: rowArgs.slice(2),
    },
  );
  return {
    template: args['--template'],
  };
};
