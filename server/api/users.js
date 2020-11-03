const router = require('express').Router();

//get users >> dont think I want to display who the users are?
router.get('/', async (req, res, next) => {
    const users = 0 // get users from their db
});

//create new user? post does that right??
router.post('/', async (req, res, next) => {
    // dbName.create(users info)
});

// what other routes are needed?
//delete user

module.exports = router;