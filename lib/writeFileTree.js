const { promisify } = require('util');
const fs = require('fs');
const ncp = require('ncp');
const path = require('path');

const access = promisify(fs.access);
const copy = promisify(ncp);
const writeFileSync = promisify(fs.writeFileSync);

const src = path.resolve(__dirname, './install.js');
const dest = path.resolve(__dirname, './');

access(src, fs.constants.F_OK).catch((data) => { 
    console.log(11)
    console.log(data) 
})
copy(src, dest, {}).then((stats) => {
    // handle `stats`。
    console.log(stats)
}).catch((error) => {
    // handle error。
    console.log(error)
});
