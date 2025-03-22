import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  getMessages,
  getUsers,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.use(protectRoute);

router.get("/users", getUsers);
router.get("/:id", getMessages);

router.post("/send/:id", sendMessage);

export default router;
