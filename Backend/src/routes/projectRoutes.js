import crypto from "node:crypto";
import { Router } from "express";
import { PROJECTS_FILE, readJson, writeJson } from "../utils/fileStore.js";

const projectRoutes = Router();

function parseStringField(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseTags(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => parseStringField(item))
    .filter(Boolean);
}

function validateProjectInput(body) {
  const title = parseStringField(body.title);
  const description = parseStringField(body.description);
  const image = parseStringField(body.image);
  const github = parseStringField(body.github) || "#";
  const live = parseStringField(body.live) || "#";
  const tags = parseTags(body.tags);
  const featured = typeof body.featured === "boolean" ? body.featured : true;

  const errors = [];

  if (!title) errors.push("Project title is required.");
  if (!description) errors.push("Project description is required.");
  if (!image) errors.push("Project image URL is required.");
  if (tags.length === 0) errors.push("At least one project tag is required.");

  return {
    errors,
    project: {
      title,
      description,
      image,
      github,
      live,
      tags,
      featured
    }
  };
}

projectRoutes.get("/", async (req, res, next) => {
  try {
    const projects = await readJson(PROJECTS_FILE, []);
    res.json({
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
});

projectRoutes.post("/", async (req, res, next) => {
  try {
    const { errors, project } = validateProjectInput(req.body ?? {});

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed.",
        errors
      });
    }

    const existingProjects = await readJson(PROJECTS_FILE, []);
    const now = new Date().toISOString();
    const newProject = {
      id: crypto.randomUUID(),
      ...project,
      createdAt: now,
      updatedAt: now
    };

    existingProjects.unshift(newProject);
    await writeJson(PROJECTS_FILE, existingProjects);

    return res.status(201).json({
      message: "Project created successfully.",
      project: newProject
    });
  } catch (error) {
    return next(error);
  }
});

export default projectRoutes;
