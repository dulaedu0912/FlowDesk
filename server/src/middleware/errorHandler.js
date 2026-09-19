import { logger } from "../config/logger.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let error = err;
  if (err.name === "ValidationError") error = ApiError.badRequest(err.message);
  if (err.name === "CastError") error = ApiError.badRequest("Invalid ID format");
  if (err.code === 11000) error = ApiError.conflict("Duplicate value for unique field");
  if (err.name === "JsonWebTokenError") error = ApiError.unauthorized("Invalid token");
  if (err.name === "TokenExpiredError") error = ApiError.unauthorized("Token expired");
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  logger.error({ message, statusCode, stack: err.stack, path: req.originalUrl, method: req.method });
  res.status(statusCode).json({
    success: false,
    error: { message, details: error.details, stack: env.NODE_ENV === "development" ? err.stack : undefined }
  });
};
