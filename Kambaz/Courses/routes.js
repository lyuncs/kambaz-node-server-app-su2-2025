import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js"; // 🆕 添加模块 DAO 导入

export default function CourseRoutes(app) {
  // 🆕 获取课程的模块 (5.3.5.1)
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  // 🆕 为课程创建新模块 (5.3.5.2)
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  // 现有的课程路由保持不变
  // 获取所有课程
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  // 🆕 添加创建课程路由（如果还没有的话）
  app.post("/api/courses", (req, res) => {
    const course = dao.createCourse(req.body);
    res.json(course);
  });

  // 删除课程
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });

  // 更新课程
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  // 🆕 添加根据ID获取单个课程的路由（如果需要的话）
  app.get("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const course = dao.findCourseById(courseId);
    res.json(course);
  });
}
