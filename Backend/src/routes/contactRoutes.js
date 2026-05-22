import crypto from "node:crypto";
import { Router } from "express";
import { CONTACTS_FILE, readJson, writeJson } from "../utils/fileStore.js";

const contactRoutes = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactRoutes.get("/", async (req, res, next) => {
  try {
    const contacts = await readJson(CONTACTS_FILE, []);
    res.json({
      count: contacts.length,
      contacts
    });
  } catch (error) {
    next(error);
  }
});

contactRoutes.post("/", async (req, res, next) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    const subject = typeof req.body.subject === "string" ? req.body.subject.trim() : "";
    const message = typeof req.body.message === "string" ? req.body.message.trim() : "";

    const errors = [];

    if (!name) errors.push("Name is required.");
    if (!email) errors.push("Email is required.");
    if (email && !isValidEmail(email)) errors.push("Email format is invalid.");
    if (!subject) errors.push("Subject is required.");
    if (!message) errors.push("Message is required.");

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed.",
        errors
      });
    }

    const existing = await readJson(CONTACTS_FILE, []);
    const submission = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    existing.unshift(submission);
    await writeJson(CONTACTS_FILE, existing);

    return res.status(201).json({
      message: "Contact form submitted successfully.",
      submission: {
        id: submission.id,
        createdAt: submission.createdAt
      }
    });
  } catch (error) {
    return next(error);
  }
});

export default contactRoutes;
