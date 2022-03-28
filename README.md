[<img src="https://user-images.githubusercontent.com/72868196/160446275-1c6983f9-284a-4067-b28f-da4f80be3a37.jpg" style="width: 300px; height: 150px; object-fit: cover;" />](https://www.npmjs.com/package/dev-template)

## Dev Template

```sh
dt --template mvc
```

No more installing and configuring all basic dependencies manually every time you start a new project. the [dev template](https://www.npmjs.com/package/dev-template) can install and configure everything with a single command. A CLI that runs templates with a sequence of commands to launch your projects. Anyone (including you) can create a template that will install and run the commands needed to start your projects.

[![current version](https://img.shields.io/npm/v/dev-template.svg)](https://www.npmjs.com/package/dev-template)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installing the command line tool

The dev template is currently tested on Node.js 14 & 16, although it may work on
older versions of Node.js. You must also have npm 6 or higher.

you need to have installed: [git](https://git-scm.com), [npm](https://www.npmjs.com) and [node](https://nodejs.org/en)

Installation is as simple as running the following command (if you see `EACCES` error, reading [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) may help):

```sh
npm install -g dev-template
```

## Example

Create and open a new empty folder and run our hello-world as an example. wait until the process finishes and run `yarn dev` after starting the server open your browser at http://localhost:3000 and see if it is showing "Hello World!"

```sh
mkdir example-dt
```

```sh
cd example-dt
```

```sh
dt --template hello-world
```

```sh
yarn dev
```

## How to use

To get started you need to keep in mind one of the templates created by the community for the dev template, see the [list](https://dtemplate.github.io/dev-template/) if you don't know one by heart.

Now run follow the instructions in template documentation or only run:

```sh
dt --template {template-name}
```

You can get the template name into the [list](https://dtemplate.github.io/dev-template/).


to see the template documentation click on template card in the [list](https://dtemplate.github.io/dev-template/)

## footer

if you want to contribute to the project read the [terms of contribution](https://github.com/dtemplate/dev-template/blob/master/CONTRIBUTING.md#developers-certificate-of-origin). if you want to create your own template for everyone to use read the [template documentation](https://github.com/dtemplate/dev-template/blob/master/TEMPLATE-DOCUMENTATION.md)
