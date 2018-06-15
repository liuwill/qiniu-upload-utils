
export function readBucketConfig () {
  if (!process.env.QINIU_ACCESS_KEY || !process.env.QINIU_SECRET_KEY) {
    return null
  }
  return {
    accessKey: process.env.QINIU_ACCESS_KEY,
    secretKey: process.env.QINIU_SECRET_KEY,
  }
}
