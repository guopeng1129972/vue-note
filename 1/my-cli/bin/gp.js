#!/user/bin/env node

process.title = 'gp'

require('commander')
  // .version(require('../package.json').version)
  .version(require('../package').version)
  .usage('<commend>[optins]')
  .command('generate', 'generate file from a templater (short-cut alias:"g")')
  // 通过访问process.argv我们能轻松愉快的接收通过命令执行node程序时候所传入的参数
  .parse(process.argv)
require('./gp-generate')