"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPaddleOcrClient = void 0;
/**
 * MockPaddleOcrClient 使用简单的文本解析模拟 PaddleOCR，便于本地演示。
 */
class MockPaddleOcrClient {
    constructor(filesystemClient) {
        this.filesystemClient = filesystemClient;
        console.log("debugging: initialized MockPaddleOcrClient"); // 初始化时输出调试信息。
    }
    /**
     * 核心方法：读取文件内容，拆分为行，并构建结构化 OCR 结果。
     */
    async runStructuredOcr(imagePath) {
        console.log("debugging: runStructuredOcr invoked", imagePath); // 输出调试日志。
        const binaryContent = await this.filesystemClient.readBinary(imagePath); // 读取文件内容。
        const textContent = binaryContent.toString("utf-8"); // 将 Buffer 转为 UTF-8 文本，模拟 OCR。
        console.log("debugging: converted buffer to text", textContent.length); // 输出文本长度。
        const sanitizedText = textContent.trim().length > 0 ? textContent.trim() : "示例题干：1+1=?"; // 若为空则提供默认文本。
        const lines = sanitizedText.split(/\r?\n/); // 按行分割文本。
        console.log("debugging: split lines", lines.length); // 输出行数。
        const spans = lines.map((line, index) => ({
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
        const ocrResult = {
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
exports.MockPaddleOcrClient = MockPaddleOcrClient;
