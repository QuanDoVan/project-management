import { File } from "src/models/file.model";

export const FileProviders = [
    {
        provide: 'FILE_REPOSITORY',
        useValue: File
    }
]