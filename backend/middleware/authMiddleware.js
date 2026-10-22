const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) =>{

    const authHeader = req.headers.authorization;

    // Expected format: Authorization: Bearer <token>
    const token = authHeader?.startswith("Bearer")
        ? authHeader.slice(7)
        :null;
    
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required. Please log in.",
        });
    }

    const secret = process.env.JWT_SECRET;

    if(!secret) {
        return res.status(500).json({
            success: false,
            message: "Authentication is not configured.",
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token. Please log in again."
            });
        }

        req.user = decoded;
        next();
    });
};

const requireAdmin = (req, res, next) => {
    if(req.user?.role != "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Administrator privileges required."
        });
    }

    next();
};

module.exports ={
    authenticateToken,
    requireAdmin
};