import arg from 'arg';

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

function cli(args) {
    const options = parseArgumentsIntoOptions(args);
    console.log(options);
}

export { cli };
