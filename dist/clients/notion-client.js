"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockNotionClient = void 0;
/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
class MockNotionClient {
    constructor() {
        /**
         * 用于生成伪页面 ID 的计数器。
         */
        this.pageCounter = 0; // 初始化计数器。
    }
    /**
     * 模拟创建页面：打印内容并返回 ID。
     */
    async createPage(payload) {
        console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
        console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
        const newId = `page-${++this.pageCounter}`; // 生成 ID。
        console.log("debugging: created Notion page ID", newId); // 输出 ID。
        return newId; // 返回 ID。
    }
    /**
     * 模拟更新页面属性。
     */
    async updatePage(pageId, properties) {
        console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
        console.log("debugging: new properties", properties); // 输出属性。
    }
    /**
     * 模拟创建评论。
     */
    async createComment(pageId, commentText) {
        console.log("debugging: creating comment", pageId); // 输出页面 ID。
        console.log("debugging: comment text", commentText); // 输出评论文本。
    }
    /**
     * 根据任务构建评论文本的辅助方法。
     * @param task 学习任务对象。
     */
    buildCommentFromTask(task) {
        console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
        return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
    }
}
exports.MockNotionClient = MockNotionClient;
