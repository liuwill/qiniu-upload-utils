
export function readBucketConfig() {
  if (!process.env.QINIU_ACCESS_KEY || !process.env.QINIU_SECRET_KEY || !process.env.QINIU_BUCKET) {
    return null
  }
  return {
    bucket: process.env.QINIU_BUCKET,
    accessKey: process.env.QINIU_ACCESS_KEY,
    secretKey: process.env.QINIU_SECRET_KEY,
  }
}
