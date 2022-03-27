# How does the CLI work?
Basically the dt (dev template) is a cli that runs scripts and commands predefined by a person, these commands are added in a “template” which is in turn added to the dt and it runs the commands and scripts from the template. In this documentation you will learn how to add a template to dt for everyone to use.

# Docs
Here is documented everything you need to know about templates, from currently accepted settings through file structure to how to add it to dt.

## Basic dependencies
To get started you need to have [installed the dev template command line tool](https://github.com/dtemplate/dev-template#installing-the-command-line-tool) to be able to run and generate your new template.

## Generating your template
Para começar crie uma pasta com o nome do seu template, acesse a pasta através da linha de comando e digite o seguinte comando:

```sh
$ mkdir my-template
$ cd my-template
$ dt --template generate
```

Wait for the return of the above command to be processed and after that open the folder in [visual studio code](https://code.visualstudio.com/) or in your favorite code editor. to open in [visual studio code](https://code.visualstudio.com/) type in terminal:

```sh
code .
```

After that, still in the terminal you can run `yarn dev` and your template will be run in development mode. then a folder called `output` will be created where you have all the result of your template (everything your template does when running) now see the initial folder structure of a template

By typing the above commands, a template will be automatically generated for you which, when executed, creates the files called `example.js` and `package.json`. i.e. if you published your template like this, when someone types in the command line:

```sh
dt –template {your template name here}
```

it would automatically create in the root of the folder (where it ran) the files 'examplo.js' and `package.json`.

Now going back to the files and folders of your template (those that were generated like you the code of [generating your template](#generating-your-template)).

The following folders and files will be created in the following structure:

```sh
📦my-template
 ┣ 📂.git
 ┣ 📂node_modules
 ┣ 📂src
 ┃ ┣ 📂base
 ┃ ┃ ┗ 📜example.js.dt
 ┃ ┗ 📂generators
 ┃ ┃ ┗ 📜example.js
 ┣ 📜.gitignore
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜template.json
 ┗ 📜yarn.lock
```

### Understanding the folders

The `.git` folder should be ignored (it is just the folder where the [git](https://git-scm.com) settings are located).

The `node_modules` folder should be ignored (it is just the folder where your template's basic dependencies are located).

The `src` folder is the folder where your template code is.

The `src/base` folder is the folder where the base files are for you to work, example: if I want to generate a file 'examplo.js' for my end user that has a specific code inside that file (that is, when running in the terminal `dt –template {my template name here}` I want the file examplo.js to appear), just create a file examplo.js.dt in the base folder and add the build settings in the generators folder.

The `src/generators` folder is the folder where the files that will be used to generate specific files are, for example if I want to generate an `example.js` file in the directory where the user ran `dt –template {the name of my template here}` I just create a file called `example.js` in `src/generators` folder and add there all the logic to read my file in the `src/base` folder and write it to the root where the command was run (using [fs](https://nodejs.org/api/fs.html) for example).

The `.gitignore` file contains files and folders that should not be uploaded with your template (should be ignored).

The `package.json` file contains your project data in general, eg its installed dependencies (should be ignored).

The `template.json` file is the most important file in your template where it contains your template data. see more about it in the [template.json documentation](#templatejson).

The `yarn.lock` file contains internal data that [yarn](https://yarnpkg.com) uses. Just ignore that file.

### template.json
This is the file that dt will read and contains all your template data. See its data structure below:

```json
{
  "name": "hello-world", /* your template name */
  "version": "1.0.0", /* your template current version */
  "description": "Write here a description for your template", /* here describe your template */
  "run": [ /* all commands that will be run */
    "yarn init -y",
    "file:/src/generators/example.js"
  ]
}
```

Inside this file there are several properties as you can see above, but all are self-descriptive, I just want to call attention to `run` there you pass an array of strings where you have all the commands that dt will execute when the user runs ` dt –template {my template name here}`. just type something like `"yarn add express"` and it will run.

If you're a good observer for sure you've seen something strange `"file:/src/generators/example.js"` basically it's the prefixes, you can pass a prefix that will make dt behave differently when executing that command. example of the prefix `file:` it will execute the file from the directory you passed right in front of it. WARNING the file must be a [generator](#generators). currently the `file:` prefix is the only one developed.

### Generators
Generators are the files in the `src/generators` directory. These files are used to generate files and handle files.

To get started you need to export a function called `main` that takes two parameters `rootDirectory` (directory where the user ran `dt –template {my template name here}`) and `templateDirectory` (root directory of your template. where your template is running). example:

```js
export const main = async ({ rootDirectory, templateDirectory }) => {
// your code...
};
```

To handle files just use [fs](https://nodejs.org/api/fs.html) to get your base files and save them in the directory wherever you want. example:

```js
const fs = require("fs"); // importing the fs

// declare the maisn function
export const main = async ({ rootDirectory, templateDirectory }) => {

  // read the file on ./src/base/example.js.dt
  const exampleJsonFile = fs.readFileSync(
    `${templateDirectory}/src/base/example.js.dt`,
    "utf-8"
  );

  // write all data on file ./src/base/example.js.dt into a file ./example.js was run the command dt –template {my template name here}
  fs.writeFileSync(`${rootDirectory}/example.js`, exampleJsonFile);
};
```

After that and after you have added the path to your generator in the `template.json` file in the `run` field using `file:` before the path, dt will execute the `main` function, you can run `yarn dev` to test and see all result in folder `output`. WARNING generators must be written in javascript.

## Publishing your template
After your template is ready you can [upload it to github](https://docs.github.com/pt/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github) and add it to the dev template by following these steps:
