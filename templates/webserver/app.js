const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(compression());

app.use('/', function(req,res,next){
    res.send('page');
});

const port = 3000;

app.listen(port, () => {
    console.log(`server is listen on the port ${port}`);
});

module.exports = app;
