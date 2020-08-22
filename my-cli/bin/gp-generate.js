#! user/bin/env node

const program = require('commander')
const chack = require('chalk')
const gp = require('../src/generate')
program
  .command('generate')
  .description('quick generate you file')
  .alias('g')
  .action((type, name) => {
    gp.run(type, name)
  })
program.parse(process.argv)