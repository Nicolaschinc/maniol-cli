const program = require('commander');
const VERSION = require('../package').version;
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const ncp = require('ncp');

const access = promisify(fs.access);
const writeFileSync = promisify(fs.writeFileSync);
const copy = promisify(ncp);

const MODE_0666 = parseInt('0666', 8)
const MODE_0755 = parseInt('0755', 8);

export function cli(args) {
    const _outputHelp = program['outputHelp'];
    const _unknownOption = program['unknownOption'];

    program['outputHelp'] = function () {
        this._helpShown = true;
        _outputHelp.apply(this, arguments);
    }

    program['unknownOption'] = function () {
        this._allowUnknownOption = this._helpShown;
        if (!this._helpShown) {
            program.outputHelp();
            console.log('\r');
        }
        _unknownOption.apply(this, arguments);
    }

    program
        .name('maniol')
        .version(VERSION, '-v, --version')
        .usage('<command> [options]')
        .option('    --git', 'add .gitignore')
        .option('-c, --css <engine>', 'add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)')
        .parse(args);

    function main() {
        let dirName = program.args[0] || 'myapp';
        let destPath = path.resolve(dirName);

        mkdir(destPath, '.');
        mkdir(destPath, 'public');
        mkdir(destPath, 'public/js');
        mkdir(destPath, 'public/css');
        mkdir(destPath, 'images');
        mkdir(destPath, 'view');

        switch (program.css) {
            case 'less':
                break;
            case 'sass':
                break;
            default:
                copy(path.resolve('./templates/static/style.css'), path.join(destPath, 'public/css/style.css'), { clobber: false }).catch(err => { console.error('copy fail, %s: %s', chalk.red.bold('ERROR'), err) });
                break;
        }
        createPkg(dirName, destPath);
    }

    async function createPkg(name, dir) {
        let pkg = {
            "name": name,
            "version": VERSION,
            "scripts": {
                "start": "webpack-dev-server",
                "build": "webpack --config webpack.config.js"
            },
            'private': true,
            "license": "ISC",
            "devDependencies": {
                "@babel/core": "^7.10.2",
                "@babel/polyfill": "^7.10.1",
                "@babel/preset-env": "^7.10.2",
                "babel-loader": "^8.1.0",
                "clean-webpack-plugin": "^3.0.0",
                "css-loader": "^3.5.3",
                "file-loader": "^6.0.0",
                "html-webpack-plugin": "^4.3.0",
                "style-loader": "^1.2.1",
                "webpack": "^4.43.0",
                "webpack-cli": "^3.3.11",
                "webpack-dev-server": "^3.10.3"
            }
        }

        try {
            await access(dir, fs.constants.R_OK);
        } catch (err) {
            console.log("directory doesn't exist!");
        }

        write(`${dir}/package.json`, JSON.stringify(pkg, null, 2),);
        console.log(`   ${chalk.blue('create')} : ${dir}/package.json  `);
    }

    /**
     * create directory.
     */
    function mkdir(base, dir) {
        mkdirp.sync(path.join(base, dir), MODE_0755);
        console.log(`   ${chalk.blue('create')} : ${path.join(base, dir)}${path.sep} `);
    }

    /**
     * write file 
     */
    function write(dest, str, mode) {
        writeFileSync(dest, str, { mode: mode || MODE_0666 }).catch(err => {
            console.log(`${chalk.red('fail to copy file:') + err}`);
        });
    }

        main();
    }

