import execa from 'execa';
import { RunFile } from './RunFile';
import listr from 'listr';

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
      return {
        title: `Running file: ${command.slice(5, command.length)}`,
        task: async () => {
          await RunFile({ filePath, templateDirectory, rootDirectory });
        },
      };
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
  const tasksRow = [];

  for (const command of commands) {
    const { index: prefixIndex, prefix } = await detectPrefix(command);
    if (prefixIndex !== -1) {
      tasksRow.push(
        await HandlePrefix({
          command,
          templateDirectory,
          prefix,
          rootDirectory,
        }),
      );
    } else {
      tasksRow.push({
        title: `Running command: ${
          command.length > 80 ? command.slice(0, 80) + '...' : command
        }`,
        task: async () => {
          await execa(command);
        },
      });
    }
  }
  return new listr(tasksRow);
};
