import OSS from 'ali-oss';
console.log(process.env.OSSAccessKeyId);
const OSSClient = new OSS({
  region: 'oss-cn-beijing.aliyuncs.com',
  accessKeyId: process.env.OSSAccessKeyId,
  accessKeySecret: process.env.OSSAccessKeySecret,
  bucket: 'ski-music/avatar/',
});
export { OSSClient };
