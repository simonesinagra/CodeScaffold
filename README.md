# CodeScaffold

An intuitive CLI tool that swiftly constructs project foundations. Easily generate structured codebases from templates, laying a solid groundwork for efficient development. Simplify project setup and focus on building great software.

This tool is inspired by the article series **How to Create Your Own CLI with Node.js** by Anton Subbotin:

- [How to Create Your Own CLI with Node.js — Part 1](https://javascript.plainenglish.io/how-to-create-your-own-cli-with-node-js-9004091a64d5)
- [How to Create Your Own CLI with Node.js — Part 2](https://javascript.plainenglish.io/how-to-create-your-own-cli-with-node-js-7646a976f8fa)

## Table of Contents
- [Available Templates](#available-templates)
- [Adding New Templates](#adding-new-templates)
- [Usage](#usage)
- [Parameters, Flags, and Options](#parameters-flags-and-options)

## Available Templates

CodeScaffold provides the following templates for generating codebases:

- plain-js
- plain-ts
- react-ts-tailwind
- nextjs-ts-tailwind-pages
- nextjs-ts-tailwind-app
<!-- 
see https://stackblitz.com/?starters=frontend

- static (html/js/css)

CREATIVE
- plain-threejs
- greensock-react

BE
- express-server ?
- nestjs ?
- graphql

FULL STACK
project with backend and frontend folders (see https://github.com/BendingSpoons/around)

OTHER
- npm-project ? 
-->

## Adding New Templates

To add a new template:

1. Place the template in the `templates` folder.

2. Update the `templates` array inside the [types.ts](src/types.ts) file. The `SupportedTemplate` type will be updated accordingly.

## Usage

1. Build the project using `yarn build`.

2. Register the command `create-project` as a command line interface running `yarn link`.
You can always unlink by running `yarn unlink`.

3. From anywhere (aka the folder in which you want to start the project), run the command `create-project` and follow the instructions of the CLI to generate the new project.

## Parameters, Flags, and Options

The following parameters, flags, and options are available when using CodeScaffold:

- `--git` with shorthand `-g`: Initialize a git repository inside the created project.
- `--install` with shorthand `-i`: Install the dependencies of the selected template.
- `--yes` with shorthand `-y`: Skip the `--git` and `--install` flags and interpret them as if they were passed.
- `--template` with shorthand `-t`: Use a custom template. The second parameter is the path on the local machine to the directory with the desired template. You can also use the `file:` syntax. Example:
   ```bash
   create-project -t file:./my-custom-template
   ```