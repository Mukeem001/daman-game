// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errorCode = err.code || "UNKNOWN_ERROR";

  // Log error details
  console.error({
    timestamp: new Date().toISOString(),
    status,
    errorCode,
    message,
    path: req.path,
    method: req.method,
    ip: req.ip,
    stack: err.stack,
  });

  // Build response object
  const errorResponse = {
    success: false,
    error: {
      message,
      code: errorCode,
    },
  };

  // Add stack trace in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.error.stack = err.stack;
    errorResponse.error.details = err;
  }

  res.status(status).json(errorResponse);
};

// 404 Not Found Handler
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.method} ${req.path} not found`,
      code: "ROUTE_NOT_FOUND",
    },
  });
};

// Async Route Wrapper - Catches errors in async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler,
};
