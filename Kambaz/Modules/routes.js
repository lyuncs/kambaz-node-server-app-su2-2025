import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    console.log(`Fetching modules for course: ${courseId}`);
    
    try {
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ message: "Error fetching modules" });
    }
  });

  app.get("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    
    try {
      const module = await modulesDao.findModuleById(moduleId);
      
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      res.json(module);
    } catch (error) {
      console.error("Error fetching module:", error);
      res.status(500).json({ message: "Error fetching module" });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };
    
    try {
      const newModule = await modulesDao.createModule(module);
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ message: "Error creating module" });
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });
}
