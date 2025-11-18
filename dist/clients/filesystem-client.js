"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFilesystemClient = void 0;
const fs_1 = require("fs"); // 引入文件系统 Promise API 以便异步读写文件。
/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
class LocalFilesystemClient {
    /**
     * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
     */
    async readBinary(absolutePath) {
        console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
        const fileBuffer = await fs_1.promises.readFile(absolutePath); // 实际读取文件并获取 Buffer。
        console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
        return fileBuffer; // 返回读取到的 Buffer。
    }
}
exports.LocalFilesystemClient = LocalFilesystemClient;
