import express, { Router } from "express";
import * as controller from "../controllers/auth";

const router: Router = express.Router();

router.post("/signup", controller.signUp);
router.post("/sign-in", controller.signIn);

export default router;
