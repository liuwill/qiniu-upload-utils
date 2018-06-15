import qiniu from 'qiniu'
import path from 'path'
import * as envUtils from './environment'

const bucketConfig = envUtils.readBucketConfig()
if (!bucketConfig) {
  // console.log('Can Not Find qiniu Access Key.')
  process.exit(0)
}

var config = new qiniu.conf.Config()
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2
// 是否使用https域名
// config.useHttpsDomain = true
// 上传是否使用cdn加速
// config.useCdnDomain = true

var bucket = bucketConfig.bucket
var accessKey = bucketConfig.accessKey
var secretKey = bucketConfig.secretKey
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

export function uploadFileBatch(basePath, fileList) {
  for (const fileConfig of fileList) {
    const singleObject = path.join(basePath, fileConfig.name)
    // console.log(singleObject)
    uploadSingleFile(singleObject, fileConfig.path)
  }
  return
}

export function uploadSingleFile(objectKey, filePath) {
  var keyToOverwrite = objectKey// 'image.jpg'
  var options = {
    scope: bucket + ':' + keyToOverwrite
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)

  var localFile = filePath // '/Users/videopls/liuwill/imgs/efac6b11895368f999021298257e954e.jpg'
  var formUploader = new qiniu.form_up.FormUploader(config)
  var putExtra = new qiniu.form_up.PutExtra()
  var key = keyToOverwrite
  // 文件上传
  formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
    respBody, respInfo) {
    if (respErr) {
      throw respErr
    }

    if (respInfo.statusCode === 200) {
      console.log(respBody)
    } else {
      console.log(respInfo.statusCode)
      console.log(respBody)
    }
  })
}
