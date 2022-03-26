import axios from 'axios';
import { ITemplateBasicInfo } from '../interfaces/ITemplate';

const JSON_TEMPLATES_BASE_URL =
  'https://raw.githubusercontent.com/Theryston/dev-template/master/dev-template.json';

export const GetTemplates = async (): Promise<ITemplateBasicInfo[]> => {
  const { data: templates }: { data: ITemplateBasicInfo[] } = await axios.get(
    JSON_TEMPLATES_BASE_URL,
  );
  return templates;
};
