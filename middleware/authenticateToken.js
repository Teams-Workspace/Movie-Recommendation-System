const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    if (req.path === '/auth/login') {
        return next();  // Skip token verification for the login page
    }

    const token = req.cookies.token;
    // console.log('Token:', token);

    if (!token) {
        return next();  // Allow unauthenticated requests to proceed
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        // console.log('Verified User:', req.user);
        next();
    } catch (err) {
        // console.error('JWT Verification Error:', err);
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).render('login');  // Render token expired page
        }

        res.status(400).render('404');  // Render 404 page for other token errors
    }
};

module.exports = authenticateToken;
