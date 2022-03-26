import { GetTemplates } from './utils/GetTemplates';
import chalk from 'chalk';
import { CloneTemplateRepository } from './git/CloneTemplateRepository';
import { SortTemplateByName } from './utils/SortTemplateByName';
import { SearchTemplateByNameWithBinarySearch } from './utils/SearchTemplateByNameWithBinarySearch';
import { GetTemplateDataFromDirectory } from './utils/GetTemplateDataFromDirectory';
import { HandleCommands } from './runners/HandleCommands';
import { DeleteDevTempleteFiles } from './utils/DeleteDevTempleteFiles';
import listr from 'listr';

const log = console.log;

export const HandleTemplateFuncs = async (templateName: string) => {
  if (!templateName) throw new Error(`Please use --template {template-name}`);

  let template;
  let templateFilesDirectory;
  let templateJsonDataFromRepository;

  const tasks = new listr([
    {
      title: 'Searching for templates',
      task: async () => {
        let templates = await GetTemplates();
        templates = SortTemplateByName(templates);
        template = await SearchTemplateByNameWithBinarySearch(
          templates,
          templateName,
        );
      },
    },
    {
      title: 'Installing template',
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
        templateJsonDataFromRepository = await GetTemplateDataFromDirectory({
          directory: templateFilesDirectory,
        });
      },
    },
    {
      title: 'Running template commands',
      task: async () => {
        await HandleCommands({
          commands: templateJsonDataFromRepository.run,
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

  tasks
    .run()
    .then(() => {
      log(chalk.green(`\nTemplate ${templateName} run successfully`));
    })
    .catch(error => {
      log(chalk.red(error.message));
    });
};
