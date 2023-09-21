// A middleware function to validate requests from the client  application 
import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

export default function validate(schema: AnySchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err: any) {
      logger.error(err);
      return res.status(400).send(err.errors);
    }
  };
}
