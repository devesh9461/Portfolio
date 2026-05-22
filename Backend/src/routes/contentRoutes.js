import { Router } from "express";
import { CONTENT_FILE, PROJECTS_FILE, readJson, writeJson } from "../utils/fileStore.js";

const contentRoutes = Router();

contentRoutes.get("/", async (req, res, next) => {
  try {
    const content = await readJson(CONTENT_FILE, {});
    const projects = await readJson(PROJECTS_FILE, []);

    res.json({
      ...content,
      projects
    });
  } catch (error) {
    next(error);
  }
});

contentRoutes.put("/", async (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return res.status(400).json({
        message: "Invalid payload. Send an object with portfolio sections."
      });
    }

    const existingContent = await readJson(CONTENT_FILE, {});
    const nextContent = {
      ...existingContent,
      ...payload,
      updatedAt: new Date().toISOString()
    };

    // Projects are managed separately through /api/projects.
    delete nextContent.projects;

    await writeJson(CONTENT_FILE, nextContent);

    return res.json({
      message: "Portfolio content updated successfully.",
      content: nextContent
    });
  } catch (error) {
    return next(error);
  }
});

export default contentRoutes;
