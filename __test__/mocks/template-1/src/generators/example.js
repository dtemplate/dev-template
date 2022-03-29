const fs = require("fs");

export const main = async ({ rootDirectory, templateDirectory }) => {
  const exampleJsonFile = fs.readFileSync(
    `${templateDirectory}/src/base/example.js.dt`,
    "utf-8"
  );

  fs.writeFileSync(`${rootDirectory}/example.js`, exampleJsonFile);
};
