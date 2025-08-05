import "dotenv/config";  // 导入 dotenv 库来读取 .env 文件
import express from 'express';
import cors from "cors";
import session from "express-session";  // 导入 session 库
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";  // 🆕 新增：导入作业路由
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";  // 🔄 取消注释：导入注册路由

const app = express();

// 配置 CORS - 支持 cookies 和限制访问源
app.use(
  cors({
    credentials: true,  // 支持 cookies
    origin: process.env.NETLIFY_URL || "http://localhost:5173",  // 限制访问源
  })
);

// 配置会话选项
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",  // 从环境变量读取密钥
  resave: false,
  saveUninitialized: false,
};

// 生产环境的额外配置
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

// 使用会话中间件（必须在 CORS 之后，路由之前）
app.use(session(sessionOptions));

// 解析 JSON 请求体 - 🔑 重要：必须在所有路由之前配置
app.use(express.json());

// 注册路由 - 按照文档中的顺序
Hello(app);                // Hello 路由
Lab5(app);                 // Lab5 路由
UserRoutes(app);           // 用户路由
CourseRoutes(app);         // 课程路由
ModuleRoutes(app);         // 模块路由
AssignmentRoutes(app);     // 🆕 新增：作业路由
EnrollmentRoutes(app);     // 🔄 取消注释：注册路由

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
