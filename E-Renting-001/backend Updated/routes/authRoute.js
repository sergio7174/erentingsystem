const 
express = require('express'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),
  { signUp, login } = require('../controllers/authController');

// signUp route - home view - menu option Signup
  router.post('/signUp', signUp);
// signUp route - home view - menu option login
  router.post('/login', login);


module.exports = router;