import execa from 'execa';
import { RunFile } from './RunFile';

const detectPrefix = async (command: string) => {
  if (command.indexOf('file:') !== -1) {
    return {
      index: command.indexOf('file:'),
      prefix: 'file:',
    };
  }

  return {
    index: -1,
    prefix: '',
  };
};

export const HandlePrefix = async ({
  command,
  templateDirectory,
  prefix,
  rootDirectory,
}: {
  command: string;
  templateDirectory: string;
  prefix: string;
  rootDirectory?: string;
}) => {
  switch (prefix) {
    case 'file:':
      const filePath = `${templateDirectory}${command.slice(
        5,
        command.length,
      )}`;
      await RunFile({ filePath, templateDirectory, rootDirectory });
      return;
  }
};

export const HandleCommands = async ({
  commands,
  templateDirectory,
  rootDirectory,
}: {
  commands: string[];
  templateDirectory: string;
  rootDirectory?: string;
}) => {
  for (const command of commands) {
    const { index: prefixIndex, prefix } = await detectPrefix(command);
    if (prefixIndex !== -1) {
      await HandlePrefix({ command, templateDirectory, prefix, rootDirectory });
      return;
    }

    await execa(command);
  }
  return;
};
