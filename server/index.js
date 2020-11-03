// entry point for server js >> old
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './path/to/static/assets')));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./apiRoutes'));

//sends index.html >> keep this at the end of routes in this file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './path/to/index.html'));
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