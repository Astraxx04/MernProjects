const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Token not provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    }
    catch (err) {
        throw new UnauthenticatedError("Not authorised to access this route");
    }
};

module.exports = authMiddleware;