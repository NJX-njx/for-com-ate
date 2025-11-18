import { LocalFilesystemClient } from "./clients/filesystem-client"; // 引入本地文件系统客户端。
import { MockPaddleOcrClient } from "./clients/paddleocr-client"; // 引入模拟 PaddleOCR 客户端。
import { MockNotionClient } from "./clients/notion-client"; // 引入模拟 Notion 客户端。
import { MockWenxinOrchestrator } from "./utils/wenxin-orchestrator"; // 引入模拟文心编排器。
import { LearningAgent } from "./workflow/learning-agent"; // 引入智能体类。
import { LearnerProfile, LearningTask } from "./types"; // 引入类型定义。
import { FeedbackLoopManager } from "./utils/feedback-loop"; // 引入反馈管理器。

/**
 * main 函数串联样例：读取 demo 文档，执行四种任务，并输出结果。
 */
async function main(): Promise<void> { // 定义主函数。
  console.log("debugging: main started"); // 输出调试信息。
  const filesystemClient = new LocalFilesystemClient(); // 实例化文件系统客户端。
  const ocrClient = new MockPaddleOcrClient(filesystemClient); // 实例化 OCR 客户端。
  const notionClient = new MockNotionClient(); // 实例化 Notion 客户端。
  const wenxinOrchestrator = new MockWenxinOrchestrator(); // 实例化文心编排器。
  const agent = new LearningAgent(ocrClient, notionClient, wenxinOrchestrator); // 创建智能体。
  const feedbackManager = new FeedbackLoopManager(); // 创建反馈管理器。

  const learnerProfile: LearnerProfile = { // 构建学习者画像。
    learnerId: "learner-demo", // 学习者 ID。
    competencyLevel: "中等", // 掌握水平。
    learningGoal: "巩固一次函数与应用题", // 学习目标。
    preferredStyle: "讲解+计划" // 偏好。
  }; // 画像结束。

  const tasks: Array<LearningTask> = [ // 构建任务列表。
    { taskId: "T1", type: "annotation", description: "补充批注与错因分析", priority: 5 }, // 批注任务。
    { taskId: "T2", type: "analysis", description: "生成分步解析与知识点", priority: 4 }, // 解析任务。
    { taskId: "T3", type: "organization", description: "整理成 Markdown 笔记", priority: 3 }, // 整理任务。
    { taskId: "T4", type: "planning", description: "制定 3 日复盘计划", priority: 4, dueDate: new Date(Date.now() + 3 * 86400000).toISOString() } // 计划任务。
  ]; // 列表结束。

  const demoImagePath = `${process.cwd()}/samples/demo-note.txt`; // 指定示例“图片”路径。
  const context = await agent.buildContext(demoImagePath, learnerProfile, tasks); // 构建上下文。
  const pageIds = await agent.executeTasks(context); // 执行任务并获得页面 ID。
  context.tasks.forEach((task, index) => { // 遍历任务。
    feedbackManager.recordFeedback(task, 4.5 - index * 0.5, `示例反馈：${task.description}`); // 记录示例反馈。
  }); // 循环结束。
  const strategyNote = feedbackManager.getStrategyNote(); // 计算策略建议。
  console.log("debugging: strategy note", strategyNote); // 输出策略建议。
  console.log("debugging: pipeline finished", pageIds); // 输出结果。
}

// 调用 main 并捕获异常。
main().catch((error) => { // 捕获未处理异常。
  console.error("debugging: pipeline failed", error); // 输出错误。
  process.exitCode = 1; // 设置退出码。
});

