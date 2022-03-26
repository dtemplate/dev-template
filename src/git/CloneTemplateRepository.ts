import execa from 'execa';

export const CloneTemplateRepository = async ({
  git_url,
  name,
}: {
  git_url: string;
  name: string;
}) => {
  const directory = `${process.cwd()}/.dev-template/temp/${name}`;
  await execa('git', ['clone', git_url, directory]);
  return { directory };
};
