const express = require('express');

const router = module.exports = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
})