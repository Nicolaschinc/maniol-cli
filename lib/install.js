const chalk = require('chalk');
const ncp = require('ncp');
const { projectInstall } = require('pkg-install');
const { promisify } = require('util');


const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

export async function installPkg(){
    // todo...
}