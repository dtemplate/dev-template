import { ITemplateInfo } from '../interfaces/ITemplate';
import { GetTemplateDataFromDirectory } from './GetTemplateDataFromDirectory';

describe('GetTemplateDataFromDirectory', () => {
  it('should return the template data', async () => {
    const templateData: ITemplateInfo = await GetTemplateDataFromDirectory({
      directory: '__test__/mocks/template-1',
    });
    expect(templateData.name).toBe('hello-world');
    expect(templateData.description).toBe(
      'Write here a description for your template',
    );
    expect(templateData.version).toBe('1.0.0');
  });
});
