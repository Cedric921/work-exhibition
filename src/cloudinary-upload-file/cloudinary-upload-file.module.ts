import { Global, Module } from '@nestjs/common';
import { CloudinaryUploadFileService } from './cloudinary-upload-file.service';

@Global()
@Module({
  providers: [CloudinaryUploadFileService],
  exports: [CloudinaryUploadFileService],
})
export class CloudinaryUploadFileModule {}
