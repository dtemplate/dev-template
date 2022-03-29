import { ITemplateBasicInfo } from '../interfaces/ITemplate';
import { SortTemplateByName } from './SortTemplateByName';
const templatesMock: ITemplateBasicInfo[] = [
  {
    name: 'c',
    git_url: 'https://github.com/example/c',
    description: '',
    version: '1.0.0',
  },
  {
    name: 'b',
    git_url: 'https://github.com/example/b',
    description: '',
    version: '1.0.0',
  },
  {
    name: 'a',
    git_url: 'https://github.com/example/a',
    description: '',
    version: '1.0.0',
  },
];

describe('SortTemplateByName', () => {
  it('should sort templates by name', async () => {
    const template = await SortTemplateByName(templatesMock);
    expect(template).toEqual([
      {
        name: 'a',
        git_url: 'https://github.com/example/a',
        description: '',
        version: '1.0.0',
      },
      {
        name: 'b',
        git_url: 'https://github.com/example/b',
        description: '',
        version: '1.0.0',
      },
      {
        name: 'c',
        git_url: 'https://github.com/example/c',
        description: '',
        version: '1.0.0',
      },
    ]);
  });
});
