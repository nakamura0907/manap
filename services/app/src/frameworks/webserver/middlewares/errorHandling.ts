import type { Express, NextFunction, Request, Response } from "express";
import Serializer from "@util/serializer";
import Exception from "@util/exception/Exception";
import logger from "@util/logger";

const errorHandling = (app: Express) => {
  app.use((error: Exception, _: Request, res: Response, __: NextFunction) => {
    const statusCode = error.status || 500;
    const serializer = new Serializer();

    logger.error(error.message);
    res.status(statusCode).send(serializer.error(error));
  });
};

export default errorHandling;
