const Listr = require('listr');
const chalk = require('chalk');
const copyFiles  = require('./writeFileTree');

export async function createApplication(options){
    const tasks = new Listr([
        {
            title: 'copy templates files',
            task: () => copyFiles({ src: options.src, dest: options.dest })
        }
    ]);
    
    tasks.run().catch(err => console.log(err))
    console.log("%s", chalk.green("tasks end"))
}
