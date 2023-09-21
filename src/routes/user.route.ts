//The implementation of user routes
import {createUserHandler,getUsersHandler}  from  "../controller/user.controller";
import express  from "express";
import validate from "../middleware/validateRequest";
import {userSchema} from "../schema/user.schema";


const router  = express.Router();

// POST /users

router.post("/",validate(userSchema),createUserHandler);

// GET  /users

router.get("/",getUsersHandler);


export default router;
