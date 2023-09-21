// Route to handle all user sessions
import express  from "express";
import { createSessionHandler,invalidateUserSessionHandler } from "../controller/session.controller";
import {createUserSessionSchema}  from "../schema/user.schema";
import validate  from "../middleware/validateRequest";
import isAuth  from  "../middleware/isAuthenticated"

const router = express.Router();

// router to handle the creation of sessions
router.post("/",validate(createUserSessionSchema),createSessionHandler);


router.delete("/",isAuth,invalidateUserSessionHandler);


export default router;







