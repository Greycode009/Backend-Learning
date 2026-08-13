import AppError from "../utils/AppError.js";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    req.validated = result.data;

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      throw new AppError("Validation failed.", 400, errors);
    }

    if (source === "body") {
      req.body = result.data;
    }
    req.validated = result.data;

    next();
  };
};