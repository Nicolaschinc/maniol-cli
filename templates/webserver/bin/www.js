#!/usr/bin/env node

const app = require('../app');
const debug = require('debug')('express:server');
const http = require('http');

const port = 3000;

app.listen(port, () => {
    console.log(`server is listen on the port ${port}`);
})