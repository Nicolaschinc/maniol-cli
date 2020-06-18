#!/usr/bin/env node

// CLI entry
require = require('esm')(module /*, options*/);
require('../core/index').cli(process.argv);