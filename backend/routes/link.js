import express from "express";
import { addLink,getLinks,deleteLink,getLinksById } from "../controllers/link.js"; 
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated, addLink);

router.get("/all",isAuthenticated, getLinks);

router.get("/all/:id",isAuthenticated, getLinksById);

router.delete("/delete/:id", isAuthenticated, deleteLink);

export default router;