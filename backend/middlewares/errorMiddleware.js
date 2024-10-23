const { AppError } = require("../errors/errorClass");
const handleError = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  } else if (error.code === "23505") {
    const constraint = error.constraint; // E.g., "users_email_key"
    let field;
    if (constraint.includes("email")) {
      field = "email";
    } else if (constraint.includes("username")) {
      field = "username";
    } else {
      field = "field"; // Default if unknown
    }
    return res.status(409).json({ message: `The ${field} already exists.` });
  } else if (error.code === "23502") {
    return res.status(400).json({
      message: "A required field is missing. Please fill all fields.",
    });
  }

  console.error("Unhandled error:", error); // Log the error for debugging
  return res.status(500).json({ message: "Something went wrong" });
};

module.exports = {
  handleError,
};
