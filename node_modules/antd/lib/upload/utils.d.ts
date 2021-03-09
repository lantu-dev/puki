import { RcFile, UploadFile } from './interface';
export declare function T(): boolean;
/**
 * Wrap file with Proxy to provides more info. Will fallback to object if Proxy not support.
 *
 * Origin comment: Fix IE file.status problem via coping a new Object
 */
export declare function wrapFile(file: RcFile | UploadFile): UploadFile;
export declare function replaceFileList(file: UploadFile<any>, fileList: UploadFile<any>[]): UploadFile<any>[];
export declare function getFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile<any>;
export declare function removeFileItem(file: UploadFile, fileList: UploadFile[]): UploadFile<any>[] | null;
export declare const isImageUrl: (file: UploadFile) => boolean;
export declare function previewImage(file: File | Blob): Promise<string>;
