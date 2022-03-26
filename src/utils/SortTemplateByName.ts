import { ITemplateBasicInfo } from '../interfaces/ITemplate';

export const SortTemplateByName = (templates: ITemplateBasicInfo[]) => {
  templates.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return templates;
};
