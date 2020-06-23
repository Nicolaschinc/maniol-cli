const { promisify } = require('util');
const fs = require('fs');
const ncp = require('ncp');

const access = promisify(fs.access);
const copy = promisify(ncp);

module.exports = (opt) => {
    try {
        access(opt.dest, fs.constants.R_OK)
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }
    return copy(opt.src, opt.dest, { clobber: false })
}
