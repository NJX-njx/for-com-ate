import { FilesystemClientInterface } from "./filesystem-client"; // 引入文件系统客户端接口，用于读取图片。
import { OcrStructuredResult, OcrTextSpan } from "../types"; // 引入类型定义以确保类型安全。

/**
 * PaddleOcrClientInterface 规定 OCR 客户端需要提供的核心行为。
 */
export interface PaddleOcrClientInterface { // 定义 OCR 客户端接口。
  /**
   * 执行结构化 OCR，输出多种格式文本。
   * @param imagePath 输入图片绝对路径。
   */
  runStructuredOcr(imagePath: string): Promise<OcrStructuredResult>; // 声明主方法。
}

/**
 * MockPaddleOcrClient 使用简单的文本解析模拟 PaddleOCR，便于本地演示。
 */
export class MockPaddleOcrClient implements PaddleOcrClientInterface { // 定义模拟实现。
  constructor(private readonly filesystemClient: FilesystemClientInterface) { // 通过依赖注入接收文件系统客户端。
    console.log("debugging: initialized MockPaddleOcrClient"); // 初始化时输出调试信息。
  }

  /**
   * 核心方法：读取文件内容，拆分为行，并构建结构化 OCR 结果。
   */
  async runStructuredOcr(imagePath: string): Promise<OcrStructuredResult> { // 实现接口方法。
    console.log("debugging: runStructuredOcr invoked", imagePath); // 输出调试日志。
    const binaryContent = await this.filesystemClient.readBinary(imagePath); // 读取文件内容。
    const textContent = binaryContent.toString("utf-8"); // 将 Buffer 转为 UTF-8 文本，模拟 OCR。
    console.log("debugging: converted buffer to text", textContent.length); // 输出文本长度。
    const sanitizedText = textContent.trim().length > 0 ? textContent.trim() : "示例题干：1+1=?"; // 若为空则提供默认文本。
    const lines = sanitizedText.split(/\r?\n/); // 按行分割文本。
    console.log("debugging: split lines", lines.length); // 输出行数。
    const spans: Array<OcrTextSpan> = lines.map((line, index) => ({ // 将每一行映射为 OcrTextSpan。
      lineId: `line-${index}`, // 行 ID。
      text: line, // 行文本。
      confidence: 0.95, // 模拟置信度。
      boundingBox: [0, index * 20, 500, index * 20 + 18], // 模拟坐标。
      classification: index === 0 ? "question" : "analysis", // 简单分类。
      sourceMeta: {
        page: "1", // 假设页码。
        captureTime: new Date().toISOString() // 记录当前时间。
      } // 来源元数据。
    })); // 完成 spans 数组。
    const markdownText = lines.map((line, index) => (index === 0 ? `**题目：${line}**` : `- ${line}`)).join("\n"); // 生成 Markdown 表达。
    const tableData = lines.map((line, index) => [String(index + 1), line]); // 构造简单表格数据。
    const ocrResult: OcrStructuredResult = { // 组装最终结构体。
      originalPath: imagePath, // 原路径。
      plainText: sanitizedText, // 纯文本。
      markdownText, // Markdown 文本。
      tableData, // 表格数据。
      spans // 文本片段。
    }; // 结束对象。
    console.log("debugging: assembled OCR result", ocrResult.spans.length); // 输出结果统计。
    return ocrResult; // 返回结构体。
  }
}

