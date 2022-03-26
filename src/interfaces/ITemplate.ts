export interface ITemplateInfo {
  name: string;
  version: string;
  description: string;
  run: string[];
}

export interface ITemplateBasicInfo {
  name: string;
  version: string;
  description: string;
  git_url: string;
}

export interface IMainFunction {
  main: ({
    rootDirectory,
    templateDirectory,
  }: {
    rootDirectory: string;
    templateDirectory: string;
  }) => void;
}
