import { ITemplateBasicInfo } from '../interfaces/ITemplate';
import { SearchTemplateByNameWithBinarySearch } from './SearchTemplateByNameWithBinarySearch';

const templatesMock: ITemplateBasicInfo[] = [
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
];

describe('SearchTemplateByNameWithBinarySearch', () => {
  it('should find the search template by name', async () => {
    const template = await SearchTemplateByNameWithBinarySearch(
      templatesMock,
      'b',
    );

    expect(template).toEqual(templatesMock[1]);
  });

  it('should return null if no search template is not found', async () => {
    const template = await SearchTemplateByNameWithBinarySearch(
      templatesMock,
      'd',
    );

    expect(template).toBeNull();
  });
});
