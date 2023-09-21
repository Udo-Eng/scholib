import { Request, Response } from "express";
import { createUser, getUsers } from "../services/user.service";
import logger from "../logger/logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    let userData = req.body;

    let user = await createUser(userData);

    res.status(201).json({
      name: user.name,
      email: user.email,
    });
  } catch (err: any) {
    // User was not created sucessfully
    logger.error(`User was not created sucessfully ${err.message}`);

    // Response with a 409 error meaning there was a resource conflict on the backend
    res.status(409).send({
      message: "User already exists and was not created",
      err: err.message,
    });
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    let users = await getUsers();

    return res.json(users);
  } catch (err: any) {
    // User was not created sucessfully
    logger.error(`unable to get users from the database ${err.message}`);

    // Response with a 409 error meaning there was a resource conflict on the backend
    res.status(500).send({
      message: "Unable to get users from the database",
    });
  }
}
