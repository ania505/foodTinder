const User = require('../db/models/user');
// ^^ if err add {}
const router = require('express').Router();

//get users >> dont think I want to display who the users are?
// router.get('/',  (req, res, next) => {
//     const users = 0 // get users from their db
// });
// /login does this ^^

//create new user
router.post('/signup',  (req, res, next) => {
    // dbName.create(users info)
    try {
       const user = User.create(req.body);
       req.login(user, err => {
           if (err) next(err);
           else res.json(user);
       })
    } catch (error) {
        next(error);
    }
    
});

router.put('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (! user) {
            res.status(401).send('User not found');
        } else if (! user.hasMatchingPassword(req.body.password)) {
            // where does.hasMatchingPassword come from?
            res.status(401).send('Incorrect password');
        } else {
            req.login(user, err => {
                if (err) next(err);
                else res.json(user);
            })
            // where does req.login come from??
        }

    } catch (error) {
        next(error);
    }
})

// must destroy the user on our session for security
router.delete('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(204);
});

// used to fetch logged in user on our session
// ^^ client will make req every time the app loads
// ^^^^ allows us to keep user logged in after refresh
router.get('/me', (req, res, next) => {
    res.json(req.user);
    //passport attaches session to the request object
})

// what other routes are needed?
//delete user

module.exports = router;