import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

