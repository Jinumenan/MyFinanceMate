const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user data to request
    // console.log("RequestUser:",req.user.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// const authorize = (roles) => (req, res, next) => {
//   // console.log("User Info from Token:", req.user); // Debugging log

//   if (!req.user || !roles.includes(req.user.role)) {
//     return res.status(403).json({ message: "Access denied. Insufficient permissions." });
//   }
//   next();
// };


module.exports = { authenticate };
