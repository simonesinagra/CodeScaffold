import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { fileURLToPath } from 'url';
import ncp from 'ncp';
import { promisify } from 'util';
import { execa } from 'execa';
import { projectInstall } from 'pkg-install';
import arg from 'arg';
import inquirer from 'inquirer';

const copy = promisify(ncp);
async function copyTemplateFiles(templateDir, targetDir) {
    return copy(templateDir, targetDir, { clobber: false });
}

async function initGitRepo(targetDir) {
    const result = await execa('git', ['init'], {
        cwd: targetDir
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
    return true;
}

function installPackages(targetDir) {
    return projectInstall({
        cwd: targetDir
    });
}

async function createProject(options) {
    const targetDirectory = process.cwd();
    const currentFileUrl = import.meta.url;
    const templateDirectory = path.resolve(decodeURI(fileURLToPath(currentFileUrl)), '../../templates', options.template.toLowerCase());
    const tasks = new Listr([
        {
            title: 'Copy project files',
            task: () => copyTemplateFiles(templateDirectory, targetDirectory)
        },
        {
            title: 'Initialize git',
            task: () => initGitRepo(targetDirectory),
            enabled: () => options.git
        },
        {
            title: 'Install dependencies',
            task: () => installPackages(targetDirectory),
            skip: () => {
                if (!options.install) {
                    return 'Pass --install or -i to automatically install dependencies';
                }
            }
        }
    ]);
    try {
        await tasks.run();
        console.log('%s Project ready', chalk.green.bold('DONE'));
    }
    catch (error) {
        console.log('%s Error occurred', chalk.red.bold('ERROR'));
    }
}

const templates = ['javascript', 'typescript'];

function checkTemplateValidity(template) {
    return typeof template === 'undefined' || templates.includes(template);
}

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--git': Boolean,
        '--yes': Boolean,
        '--install': Boolean,
        '-g': '--git',
        '-y': '--yes',
        '-i': '--install'
    }, {
        argv: rawArgs.slice(2)
    });
    const template = args._[0]?.toLowerCase();
    const isTemplateValid = checkTemplateValidity(template);
    if (!isTemplateValid) {
        console.log(`%s You passed incorrect template: ${args._[0]}. List of supported templates: ${templates.join(', ')}`, chalk.yellow.bold('WARNING'));
    }
    return {
        git: args['--git'] || false,
        install: args['--install'] || false,
        skipPrompts: args['--yes'] || false,
        template: isTemplateValid ? template : undefined
    };
}

// default values for unspecified args
const defaultOptions = {
    git: true,
    install: true,
    template: 'typescript'
};
// --yes flag is passed
const skipOptions = {
    git: true,
    install: true
};
async function promptForMissingOptions(options) {
    if (options.skipPrompts) {
        options = { ...options, ...skipOptions };
    }
    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: [
                { name: 'TypeScript', value: 'typescript' },
                { name: 'JavaScript', value: 'javascript' },
            ],
            default: defaultOptions.template
        });
    }
    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: defaultOptions.git
        });
    }
    if (!options.install) {
        questions.push({
            type: 'confirm',
            name: 'install',
            message: 'Install packages?',
            default: defaultOptions.install
        });
    }
    const answers = await inquirer.prompt(questions);
    return {
        git: options.git || answers.git,
        install: options.install || answers.install,
        template: options.template || answers.template
    };
}

async function cli(args) {
    const rawOptions = parseArgumentsIntoOptions(args);
    const options = await promptForMissingOptions(rawOptions);
    await createProject(options);
}

export { cli };
