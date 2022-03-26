import fs from 'fs';
import path from 'path';
import { ITemplateInfo } from 'src/interfaces/ITemplate';

export const GetTemplateDataFromDirectory = async ({
  directory,
}: {
  directory: string;
}): Promise<ITemplateInfo> => {
  const template = fs.readFileSync(
    path.join(`${directory}/template.json`),
    'utf8',
  );
  const templateData: ITemplateInfo = JSON.parse(template);
  return templateData;
};
