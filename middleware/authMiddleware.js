const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        token = token.replace("Bearer ", ""); // Remove "Bearer " prefix
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next(); // Continue to the next function
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

// Middleware to restrict actions to admins only
const adminOnly = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: "Access Denied. Admins only." });
    }
    next();
};

module.exports = { protect, adminOnly };
