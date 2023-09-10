import { Module } from '@nestjs/common';
import { AwsUploadFileService } from './aws-upload-file.service';

@Module({
  providers: [AwsUploadFileService],
  exports: [AwsUploadFileService],
})
export class AwsUploadFileModule {}
