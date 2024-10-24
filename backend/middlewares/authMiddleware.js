

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next(); // Pass control to the next handler
    }
    res.status(401).send("Unauthorized"); // If not logged in, respond with 401
  };

module.exports = {
    isAuthenticated
}