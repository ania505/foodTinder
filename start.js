// new entry point for NODE process

// say our sequelize instance is create in 'db.js'
const db = require('./db.js'); 
// and our server that we already created and used as the previous entry point is 'server.js'
// ^^ actually should go to /server/index.js bc thats where app is exported
const app = require('./server');
const port = process.env.PORT || 3000;

db.sync()  // sync our database
  .then(function(){
    app.listen(port) // then start listening with our express server once we have synced
  })