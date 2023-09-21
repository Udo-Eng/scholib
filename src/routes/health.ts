import express,{Router,Request,Response}  from "express";

const router :Router = express.Router();

// Basic route to handle root request
router.get("/",(req : Request,res : Response ) => {
    return  res.status(200).send(Buffer.from("Hello welcome to scholib How is your day going "));
});

export default router;