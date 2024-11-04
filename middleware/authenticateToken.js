const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.isAuthenticated = false;
        res.locals.user = {};
        return next();  // Allow unauthenticated requests to proceed
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        res.locals.isAuthenticated = true;
        res.locals.user = req.user;
        next();
    } catch (err) {
        res.locals.isAuthenticated = false;
        res.locals.user = {};
        return res.status(401).redirect('/auth/login');  // Redirect to login if token is invalid
    }
};


module.exports = authenticateToken;
