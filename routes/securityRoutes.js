import express from "express";
import { create } from "../controllers/securityController.js";

const router = express.Router();

router.delete("/", create);

export default router;
