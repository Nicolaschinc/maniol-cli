const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const consolidate = require("consolidate")

const routes = require('./routes');
const config = require('./config');

const path = require('path');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(compression());

app.set("view engine", "html");
app.set('views', './views');

app.engine("html", consolidate.ejs);

app.use(routes);

const port = 3000;

app.listen(port, () => {
    console.log(`server is listen on the port ${port}`);
});

module.exports = app;
