// middleware/setAuthVariables.js
const setAuthVariables = (req, res, next) => {
    res.locals.isAuthenticated = req.user ? true : false;
    res.locals.user = req.user || {};
    // console.log('Auth Variables:', res.locals);  // Debugging line
    next();
};

module.exports = setAuthVariables;
