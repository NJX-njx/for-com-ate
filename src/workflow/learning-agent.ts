import { PaddleOcrClientInterface } from "../clients/paddleocr-client"; // 引入 OCR 客户端接口。
import { NotionClientInterface } from "../clients/notion-client"; // 引入 Notion 客户端接口。
import { WenxinOrchestratorInterface } from "../utils/wenxin-orchestrator"; // 引入文心编排器。
import { AgentContext, LearnerProfile, LearningTask, NotionWritePayload } from "../types"; // 引入类型定义。

/**
 * LearningAgent 封装端到端流程：OCR→策略→Notion。
 */
export class LearningAgent { // 定义智能体主体类。
  constructor( // 构造函数。
    private readonly ocrClient: PaddleOcrClientInterface, // 注入 OCR 客户端。
    private readonly notionClient: NotionClientInterface, // 注入 Notion 客户端。
    private readonly wenxinOrchestrator: WenxinOrchestratorInterface // 注入文心编排器。
  ) {
    console.log("debugging: LearningAgent initialized"); // 输出初始化日志。
  }

  /**
   * 读取图片并构建 AgentContext。
   */
  async buildContext(imagePath: string, learnerProfile: LearnerProfile, tasks: Array<LearningTask>): Promise<AgentContext> { // 构建上下文方法。
    console.log("debugging: building context", imagePath); // 调试日志。
    const ocrResult = await this.ocrClient.runStructuredOcr(imagePath); // 调用 OCR。
    const context: AgentContext = { // 组装上下文。
      learnerProfile, // 画像。
      tasks, // 任务。
      ocrResult // OCR 结果。
    }; // 结束对象。
    console.log("debugging: context ready", context.tasks.length); // 输出任务数量。
    return context; // 返回上下文。
  }

  /**
   * 执行任务列表并写回 Notion。
   */
  async executeTasks(context: AgentContext): Promise<Array<string>> { // 执行任务，返回页面 ID 列表。
    console.log("debugging: executing tasks", context.tasks.length); // 输出任务数量。
    const createdPageIds: Array<string> = []; // 存储生成的页面 ID。
    for (const task of context.tasks) { // 遍历任务。
      console.log("debugging: running task", task.taskId); // 输出当前任务。
      const markdownContent = await this.wenxinOrchestrator.runTask(context, task); // 获取文心输出。
      const payload: NotionWritePayload = { // 组装写入载荷。
        parentPageId: context.learnerProfile.learnerId, // 简化：用 learnerId 作为父页面。
        title: `${task.type}-${task.taskId}`, // 标题。
        markdownContent, // Markdown 内容。
        properties: {
          priority: task.priority, // 优先级。
          type: task.type, // 任务类型。
          dueDate: task.dueDate ?? "未设定" // 截止。
        } // 属性结束。
      }; // 结束 payload。
      const pageId = await this.notionClient.createPage(payload); // 创建页面。
      createdPageIds.push(pageId); // 收集 ID。
      await this.notionClient.updatePage(pageId, { status: "generated" }); // 更新状态。
      await this.notionClient.createComment(pageId, `自动生成任务：${task.description}`); // 写评论。
    } // 循环结束。
    console.log("debugging: tasks completed", createdPageIds.length); // 输出完成数量。
    return createdPageIds; // 返回 ID 列表。
  }
}

