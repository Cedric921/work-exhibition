import { Global, Module } from '@nestjs/common';
import { AwsUploadFileService } from './aws-upload-file.service';

@Global()
@Module({
  providers: [AwsUploadFileService],
  exports: [AwsUploadFileService],
})
export class AwsUploadFileModule {}
