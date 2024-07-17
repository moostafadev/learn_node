import { NextFunction, Request, Response } from "express";

export default class NotFoundMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(404).json({
        error: `This endpoint ${req.originalUrl} is not found`,
      });
    }

    res.status(404).render("notFound", {
      titlePage: "Not found",
      message: `This endpoint ${req.originalUrl} is not found`,
    });

    next();
  }
}
