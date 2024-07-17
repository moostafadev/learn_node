import { NextFunction, Request, Response } from "express";

export default class ErrorMiddleware {
  handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }

    next();
  }
}
