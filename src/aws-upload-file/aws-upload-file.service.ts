import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsUploadFileService {
  AWS_S3_BUCKET: string;
  s3;

  constructor(private readonly config: ConfigService) {
    this.AWS_S3_BUCKET = this.config.get('AWS_S3_BUCKET');
    this.s3 = new AWS.S3({
      accessKeyId: this.config.get('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('AWS_S3_SECRET_ACCESS_KEY'),
    });
  }
  async uploadFile(file) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
