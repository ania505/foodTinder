// entry point for server js >> old
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db/db');
const passport = require('passport');
const User = require('./db/models/user');

// I FEEL LIKE THE ORDER OF STUFF HERE IS MESSY, HOW DO I FIX IT??

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(express.static(path.join(__dirname, './path/to/static/assets')));

//session middleware
// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db: db });
// sync so that our session table gets created
sessionStore.sync();

// serialization only done 1x per session, after req.login invoke
passport.serializeUser((user, done) => {
    try {
        done(null, user.id);
    } catch (error) {
        done(error);
    }
});

passport.deserializeUser(async (id, done) => {
    // User.findById(id)
    // // can i replace the .then & .catch for async/awaits & try/catch block? >> yes, exactly!
    // .then(user => done(null, user))
    // .catch(done);
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error)
    }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./apiRoutes'));


//sends index.html >> keep this at the end of routes in this file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//port app listening
// const port = process.env.PORT || 3000; 
// app.listen(port, function () {
//   console.log(`listening on port ${port}`);
// });
// ^^ moved to start.js, new entry point

//keep this at the VERY end
app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;