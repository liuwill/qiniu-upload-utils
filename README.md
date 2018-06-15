# qiniu-upload-utils

📤 简单的命令行文件上传小工具，上传目录或者文件到七牛云存储

## 编译
```shell
yarn run check

yarn run build
```

## 运行
```shell
# 上传文件
node index.js --source=/Users/liuwill/videos/video.mp4 -o upload/videos

# 上传目录
node index.js --source=/Users/liuwill/videos -o upload/videos
```
