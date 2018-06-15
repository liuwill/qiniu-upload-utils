'use strict'

import * as fileUtils from './file'
import * as envUtils from './environment'
import * as uploader from './uploader'

const argv = require('yargs')
  .usage('Usage: $0 --source=sourcePath --base=basePath')
  // .demandOption(['source', 'base'])
  .option('source', {
    describe: 'source path',
    alias: 's',
    default: '.'
  })
  .option('out', {
    describe: 'base path',
    alias: 'o',
    default: 'temp'
  })
  .help('help')
  .argv

if (!argv.source || !argv.out) {
  console.log('Please Input FilePath.')
  process.exit(0)
}
const bucketConfig = envUtils.readBucketConfig()
if (!bucketConfig) {
  console.log('Can Not Find qiniu Access Key.')
  process.exit(0)
}

const basePath = argv.source
const objectPath = argv.out

const fileList = fileUtils.listFiles(basePath)
const targetList = fileUtils.buildFileList(basePath, fileList)

uploader.uploadFileBatch(objectPath, targetList)
