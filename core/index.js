const program = require('commander');
const VERSION = require('../package').version;
const createApplication = require('../lib/tasks')

export function cli(args) {
    program
        .name('maniol')
        .version(VERSION, '-v, --version')
        .usage('<command> [options]')

    program
        .command('create <app-name>')
        .description('create a new application')
        .option('-i, --install', 'install dependencies')
        .action((name, cmd) => {
            // todo
            console.log(name)
            console.log(args)
        });

    program.parse(args);
}
