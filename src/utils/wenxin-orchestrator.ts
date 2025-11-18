import { AgentContext, LearningTask } from "../types"; // 引入上下文与任务类型。

/**
 * WenxinOrchestratorInterface 描述基于文心 4.5 的策略/生成层。
 */
export interface WenxinOrchestratorInterface { // 定义接口。
  /**
   * 根据上下文生成任务结果文本。
   * @param context 智能体上下文。
   * @param task 当前任务。
   */
  runTask(context: AgentContext, task: LearningTask): Promise<string>; // 返回生成的 Markdown 文本。
}

/**
 * MockWenxinOrchestrator 用模板字符串模拟文心输出。
 */
export class MockWenxinOrchestrator implements WenxinOrchestratorInterface { // 模拟实现。
  /**
   * 生成 Markdown 反馈，并输出调试日志。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口。
    console.log("debugging: Wenxin task start", task.taskId); // 输出任务开始调试信息。
    const leadLine = `**任务类型：${task.type}｜优先级：${task.priority}**`; // 构建首行。
    const learnerLine = `- 学习者：${context.learnerProfile.learnerId}（目标：${context.learnerProfile.learningGoal}）`; // 学习者信息。
    const summaryLine = `- OCR 摘要：${context.ocrResult.plainText.slice(0, 80)}...`; // OCR 摘要。
    const actionLine = `- 建议动作：${task.description}`; // 动作建议。
    const planLine = task.dueDate ? `- 截止：${task.dueDate}` : "- 截止：未设定"; // 截止信息。
    const markdown = [leadLine, learnerLine, summaryLine, actionLine, planLine].join("\n"); // 拼接 Markdown。
    console.log("debugging: Wenxin task output length", markdown.length); // 输出长度信息。
    return markdown; // 返回 Markdown。
  }
}

