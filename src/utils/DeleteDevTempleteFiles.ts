import rimraf from 'rimraf';

export const DeleteDevTempleteFiles = async () => {
  await rimraf.sync('.dev-template', {});
  return;
};
