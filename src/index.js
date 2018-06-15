'use strict'

import * as fileUtils from './file'
import * as envUtils from './environment'
import path from 'path'

const argv = require('yargs')
  .usage('Usage: $0 --source=sourcePath --base=basePath')
  // .demandOption(['source', 'base'])
  .option('source', {
    describe: 'source path',
    alias: 's',
    default: '.'
  })
  .option('base', {
    describe: 'base path',
    alias: 'b',
    default: 'temp'
  })
  .help('help')
  .argv

if (!argv.source || !argv.base) {
  console.log('Please Input FilePath.')
  process.exit(0)
}
const bucketConfig = envUtils.readBucketConfig()
if (!bucketConfig) {
  console.log('Can Not Find qiniu Access Key.')
  process.exit(0)
}

const basePath = argv.source

const fileList = fileUtils.listFiles(basePath)
const targetList = fileUtils.buildFileList(basePath, fileList)

console.log(targetList)
