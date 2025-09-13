import jwt from 'jsonwebtoken';

const UserAuth = async (req, res, next) => {
       
    try {
        const authHeader = req.headers;

        if (!authHeader ) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied'
            });
        }

        const token = authHeader.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
};

export default UserAuth;
