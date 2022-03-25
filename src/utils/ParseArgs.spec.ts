import { ParseArgs } from './ParseArgs';

const argsMock = ['start', 'file_called', '--template', 'template_name'];

describe('ParseArgs', () => {
  it('should return correct template', async () => {
    const args = await ParseArgs(argsMock);
    expect(args.template).toBe('template_name');
  });
});
