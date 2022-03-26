import { ITemplateBasicInfo } from '../interfaces/ITemplate';

export const SearchTemplateByNameWithBinarySearch = async (
  template: ITemplateBasicInfo[],
  name: string,
) => {
  if (!template) throw new Error(`Template not found`);

  let left = 0;
  let right = template.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (template[mid].name === name) {
      return template[mid];
    }
    if (template[mid].name > name) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return null;
};
