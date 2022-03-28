import { GetTemplates } from './utils/GetTemplates';
import chalk from 'chalk';
import { CloneTemplateRepository } from './git/CloneTemplateRepository';
import { SortTemplateByName } from './utils/SortTemplateByName';
import { SearchTemplateByNameWithBinarySearch } from './utils/SearchTemplateByNameWithBinarySearch';
import { GetTemplateDataFromDirectory } from './utils/GetTemplateDataFromDirectory';
import { HandleCommands } from './runners/HandleCommands';
import { InstallDependence } from './runners/InstallDependence';
import { UninstallDependence } from './runners/UninstallDependence';
import { DeleteDevTempleteFiles } from './utils/DeleteDevTempleteFiles';
import listr from 'listr';
import fs from 'fs';
import rimraf from 'rimraf';

const log = console.log;

export const HandleTemplateFuncs = async ({
  templateName,
  templateDirectory,
  rootDirectory,
}: {
  templateName: string;
  templateDirectory?: string;
  rootDirectory?: string;
}) => {
  let template;
  let templateJsonDataFromRepository;
  let templateFilesDirectory = `${process.cwd()}/${templateDirectory}`;
  let successfullyMessages = ['Template run successfully'];

  const tasks = new listr([
    {
      title: 'Searching for template',
      task: async () => {
        let templates = await GetTemplates();
        templates = SortTemplateByName(templates);
        template = await SearchTemplateByNameWithBinarySearch(
          templates,
          templateName,
        );
      },
      enabled: () => !templateDirectory,
    },
    {
      title: 'Installing template',
      task: async () => {
        return new listr([
          {
            title: 'Getting template files',
            task: async () => {
              const { directory } = await CloneTemplateRepository({
                git_url: template.git_url,
                name: template.name,
              });
              templateFilesDirectory = directory;
            },
          },
          {
            title: 'Getting template data',
            task: async () => {
              templateJsonDataFromRepository =
                await GetTemplateDataFromDirectory({
                  directory: templateFilesDirectory,
                });
              if (templateJsonDataFromRepository.successfullyMessages) {
                successfullyMessages =
                  templateJsonDataFromRepository.successfullyMessages;
              }
            },
          },
          {
            title: 'Installing template dependence',
            task: async () => {
              await InstallDependence({
                templateDirectory: templateFilesDirectory,
              });
            },
          },
        ]);
      },
      enabled: () => !templateDirectory,
    },
    {
      title: 'Getting template data',
      task: async () => {
        templateJsonDataFromRepository = await GetTemplateDataFromDirectory({
          directory: templateFilesDirectory,
        });
        if (templateJsonDataFromRepository.successfullyMessages) {
          successfullyMessages =
            templateJsonDataFromRepository.successfullyMessages;
        }
      },
      enabled: () => templateDirectory !== undefined,
    },
    {
      title: 'Creating output directory',
      task: async () => {
        rimraf.sync(`${process.cwd()}/output`);
        fs.mkdirSync(`${process.cwd()}/output`);
        process.chdir(`${process.cwd()}/output`);
      },
      enabled: () => rootDirectory !== undefined,
    },
    {
      title: 'Running template commands',
      task: async () => {
        return await HandleCommands({
          commands: templateJsonDataFromRepository.run,
          templateDirectory: templateFilesDirectory,
          rootDirectory,
        });
      },
    },
    {
      title: 'Going out output directory',
      task: async () => {
        process.chdir(process.cwd());
      },
      enabled: () => rootDirectory !== undefined,
    },
    {
      title: 'Deleting temp files and dependencies',
      task: async () => {
        return new listr([
          {
            title: 'Uninstalling template dependence',
            task: async () => {
              await UninstallDependence({
                templateDirectory: templateFilesDirectory,
              });
            },
          },
          {
            title: 'Deleting dev-template files',
            task: async () => {
              await DeleteDevTempleteFiles();
            },
          },
        ]);
      },
      enabled: () => !templateDirectory,
    },
  ]);

  tasks
    .run()
    .then(() => {
      log('\n');
      successfullyMessages.forEach(message => {
        log(chalk.green(`${message}\n`));
      });
    })
    .catch(error => {
      log(chalk.red(error.message));
    });
};
