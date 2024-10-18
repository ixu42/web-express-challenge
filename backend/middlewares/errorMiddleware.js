const { AppError } = require("../errors/errorClass");
const handleError = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error("Unhandled error:", error); // Log the error for debugging
  return res.status(500).json({ message: "Something went wrong" });
};

module.exports = {
  handleError,
};
