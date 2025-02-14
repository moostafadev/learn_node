import { NextFunction, Request, Response } from "express";

export default class ErrorMiddleware {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(500).json({
        error: "Internal server error",
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
      });
    }

    res.status(500).render("error", {
      titlePage: "Error",
      message: "Something went wrong. Please try again later",
      error: err.message,
    });

    next();
  }
}
