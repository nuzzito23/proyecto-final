// Verifica que el token enviado en la peticion sea válido y no haya expirado 
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret key
        req.user = decoded; // Store decoded user in request object
        next(); // Proceed to next middleware
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};