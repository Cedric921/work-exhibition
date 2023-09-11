import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsUploadFileService {
  constructor(private readonly config: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(file.buffer, originalname, file.mimetype);
  }

  async s3_upload(
    file: any,
    name: string,
    mimetype: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    try {
      const AWS_S3_BUCKET = this.config.get('AWS_S3_BUCKET');
      const params = {
        Bucket: AWS_S3_BUCKET,
        Key: String(name),
        Body: file,
        ACL: 'public-read',
        ContentType: mimetype,
        ContentDisposition: 'inline',
        CreateBucketConfiguration: {
          LocationConstraint: 'ap-south-1',
        },
      };

      // config aws
      const s3 = new AWS.S3({
        accessKeyId: this.config.get('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('AWS_S3_SECRET_ACCESS_KEY'),
      });

      return await s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
}
