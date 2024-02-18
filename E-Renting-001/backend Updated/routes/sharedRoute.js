const 
express = require('express'),
//const router = express.Router()
  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

{
    changePassword,
    getProfileDetails,
    editUser,
    myBookings
} = require('../controllers/sharedController');

// use shared Routes

router.patch('/change-password/:id', changePassword)
router.get('/profile-details/:id', getProfileDetails)
router.put('/edit-user/:id', editUser)
router.get('/my-bookings/:id', myBookings)

module.exports = router