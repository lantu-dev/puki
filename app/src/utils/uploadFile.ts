let ObsClient = require('esdk-obs-browserjs');
// 创建ObsClient实例
const obsClient = new ObsClient({
  access_key_id: 'KFCVQ8JFR6FJERZQXDZH',
  secret_access_key: 'kVn0KtdfbAjBQH3o7fcesxFDSR1JCDP4Doeak3YX',
  server: 'https://obs.cn-north-4.myhuaweicloud.com',
});

// 文件URL的基本路径，格式为 "https://endpoint/" ，后跟对象名称（由于都存放在根目录中，所以没有文件层级信息）
const baseURL = 'https://puki.obs.cn-north-4.myhuaweicloud.com/';

// 上传文件，返回文件的URL，若失败则返回 ‘err’
export async function uploadFile(file: File): Promise<string> {
  let date = new Date();
  let fileName = date.getTime() + file.name;
  let imgURL: string = '';
  imgURL = await obsClient
    .putObject({
      Bucket: 'puki',
      Key: fileName,
      SourceFile: file,
    })
    .then((result: any) => {
      if (result.CommonMsg.Status != 200) {
        return 'err';
      } else {
        return baseURL + fileName;
      }
    });
  return imgURL;
}
