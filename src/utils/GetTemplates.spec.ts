import { GetTemplates } from './GetTemplates';

describe('GetTemplates', () => {
  it('should return templates', async () => {
    const { templates } = await GetTemplates();
    expect(templates).toBeTruthy();
  });
});
