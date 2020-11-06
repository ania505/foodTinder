const router = require('express').Router();

//table of contents
router.use('/users', require('./users'));
router.use('/auth', require('./google'));
//add other api routes if you have them
// handling melody db

//error handling
router.use(function (req, res, next) {
    const err = new Error('Oops! Page not found.');
    err.status = 404;
    next(err);
});

module.exports = router;