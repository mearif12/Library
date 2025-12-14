const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure you have the User model imported

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    try {
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log(`Token verification error: ${JSON.stringify(err)}`);
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            
            // After verifying the token, fetch the full user data from the database using the id from the token
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(403).json({ message: 'Forbidden: User not found' });
            }

            // Attach the user data to the request object
            req.user = user;
            next(); // Proceed to the next middleware
        });
    } catch (error) {
        console.log('Error during token verification:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access forbidden: You don't have the current role" });
        }
        next();
    }
}

module.exports = { authenticateJWT, authorizeRole };

