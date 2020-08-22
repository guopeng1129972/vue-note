const fs = require('fs-extra');
const chalk = require('chalk');

exports.run = (type, name) => {
  switch (type) {
    case 'page':
      const pageFile = './src/page/' + name + '/' + name + '.vue';
      const styleFile = '/src/page/' + name + '/' + name + 'less';
      fs.pathExists(pageFile, (err, exists) => {
        if (exists) {
          console.log('file is created')
        } else {
          fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/page.vue', pageFile, err => {
            if (err) return console.error(err)
            console.log(pageFile + 'has creatd')
          })
          fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/page.less', styleFile, err => {
            if (err) return console.error(err)
            console.log(styleFile + 'has creatd')
          })
        }
      }); break;
    case "component":
      const componentFile = require('./src/components/' + name + '.vue')
      fs.pathExists(componentFile, (err, exists) => {
        if (exists) { console.log(componentFile + 'is created') }
        else {
          fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/component.vue', componentFile, err => {
            if (err) return console.error(err)

            console.log(componentFile + 'has created')
          })
        }
      }); break;
    case "store":
      const storeFile = require("./src/store/" + name + '.js')
      fs.pathExists(storeFile, (err, exists) => {
        if (exists) { console.error(err) }
        else {
          fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/store.js', storeFile, err => {
            if (err) return console.log(err)
            console.log(storeFile + 'has created')
          })
        }
      }); break;
    default:
      console.log(chalk.red('you shoud input like $ gp g page demo'))
      console.log()
      console.log('Examples:')
      console.log()
      console.log(chalk.gray('   #  create a new page'))
      console.log('   $  gp g page production')
      console.log('')
      console.log(chalk.gray('   #  create a new component'))
      console.log('   $  gp g component production')
      console.log('')
      console.log(chalk.gray('   #  create a new store'))
      console.log('   $  gp g store production')

  }
}




console.log('generate');