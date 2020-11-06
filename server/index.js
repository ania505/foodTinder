 
const path = require('path')
const express = require('express')
const morgan = require('morgan')
// const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db/db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 3000
const app = express()
// const socketio = require('socket.io')
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('./secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
//   app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
//   app.use('/auth', require('./auth'))
  app.use('/api', require('./apiRoutes'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
//   const io = socketio(server)
//   require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}




// // entry point for server js >> old
// const path = require('path');
// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const db = require('./db/db');
// const passport = require('passport');
// const User = require('./db/models/user');


// // static file-serving middleware
// app.use(express.static(path.join(__dirname, '..', 'public')));
// // app.use(express.static(path.join(__dirname, './path/to/static/assets')));

// //session middleware
// // configure and create our database store
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const sessionStore = new SequelizeStore({ db: db });
// // sync so that our session table gets created
// sessionStore.sync();

// // serialization only done 1x per session, after req.login invoke
// passport.serializeUser((user, done) => {
//     try {
//         done(null, user.id);
//     } catch (error) {
//         done(error);
//     }
// });

// passport.deserializeUser(async (id, done) => {
//     // User.findById(id)
//     // // can i replace the .then & .catch for async/awaits & try/catch block? >> yes, exactly!
//     // .then(user => done(null, user))
//     // .catch(done);
//     try {
//         const user = await User.findByPk(id);
//         done(null, user);
//     } catch (error) {
//         done(error)
//     }
// });

// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//     secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/api', require('./apiRoutes'));


// //sends index.html >> keep this at the end of routes in this file
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// //port app listening
// // const port = process.env.PORT || 3000; 
// // app.listen(port, function () {
// //   console.log(`listening on port ${port}`);
// // });
// // ^^ moved to start.js, new entry point

// //keep this at the VERY end
// app.use(function (err, req, res, next) {
//     console.error(err);
//     console.error(err.stack);
//     res.status(err.status || 500).send(err.message || 'Internal server error.');
// });

// module.exports = app;