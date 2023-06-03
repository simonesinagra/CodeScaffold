import arg from 'arg';
import chalk from 'chalk';

import { checkTemplateValidity } from './check-template-validity';

import { Args, RawOptions, templates } from '../types';

export function parseArgumentsIntoOptions(rawArgs: Args): RawOptions {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install'
        },
        {
            argv: rawArgs.slice(2)
        }
    );

    const template = args._[0]?.toLowerCase();
    const isTemplateValid = checkTemplateValidity(template);

    if (!isTemplateValid) {
        console.log(
            `%s You passed incorrect template: ${
                args._[0]
            }. List of supported templates: ${templates.join(', ')}`,
            chalk.yellow.bold('WARNING')
        );
    }

    return {
        git: args['--git'] || false,
        install: args['--install'] || false,
        skipPrompts: args['--yes'] || false,
        template: isTemplateValid ? template : undefined
    };
}