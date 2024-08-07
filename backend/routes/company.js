import express from "express";
import { applyComUser, deleteCom, getCom, newCom, updateCom,getComById } from "../controllers/company.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated, newCom);
router.get("/all",isAuthenticated, getCom);
router.get("/com/:id",isAuthenticated,getComById)
router.put("/update/:id",isAuthenticated,updateCom);
router.delete("/del/:id",isAuthenticated, deleteCom)
router.put("/:id",isAuthenticated,applyComUser);

export default router;