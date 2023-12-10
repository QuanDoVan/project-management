import { Inject, Injectable } from '@nestjs/common';
import { File } from 'src/models/file.model';

@Injectable()
export class FileService {
    constructor(
        @Inject('FILE_REPOSITORY')
        private readonly fileRepository: typeof File
    ) {}

    async createFile(file: any, id: number, req: any): Promise<File> {
        return await this.fileRepository.create({
          name: file.filename,
          workitem_id: id,
          user_id: req.user.id  
        })
    }
}
