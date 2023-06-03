import arg from 'arg';
import inquirer from 'inquirer';

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
    return {
        git: args['--git'] || false,
        install: args['--install'] || false,
        skipPrompts: args['--yes'] || false,
        template: args._[0]
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
    git: false,
    install: false
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
    console.log(options);
}

export { cli };
