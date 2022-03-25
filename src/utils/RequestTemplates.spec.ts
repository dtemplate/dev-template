import { RequestTemplates } from './RequestTemplates';

describe('RequestTemplates', () => {
  it('should return templates', async () => {
    const { templates } = await RequestTemplates();
    expect(templates).toBeTruthy();
  });
});
