import type { Express, NextFunction, Request, Response } from "express";
import Serializer from "@util/serializer";
import Exception from "@util/exception/Exception";

const errorHandling = (app: Express) => {
  app.use((error: Exception, _: Request, res: Response, __: NextFunction) => {
    const statusCode = error.status || 500;
    const serializer = new Serializer();

    res.status(statusCode).send(serializer.error(error));
  });
};

export default errorHandling;
