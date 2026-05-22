import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "portfolio-backend",
    timestamp: new Date().toISOString()
  });
});

export default healthRoutes;
