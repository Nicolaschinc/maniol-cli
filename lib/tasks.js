const Listr = require('listr');
const chalk = require('chalk');

const tasks = new Listr([

]);

tasks.run().catch(err => console.log(err))
console.log("%s", chalk.red("tasks end"))