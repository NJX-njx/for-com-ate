import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

