const program = require('commander');
const VERSION = require('../package').version;
const path = require('path');
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');


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
            console.log("================33")
            const options = cleanArgs(cmd);
            console.log(options)
            options.src = TEMPLATE_DIR;
            options.dest = process.cwd();
            require('../lib/tasks').createApplication(options)
        });

    program.parse(args);
}



function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''));
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    })
    return args;
}

function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}
