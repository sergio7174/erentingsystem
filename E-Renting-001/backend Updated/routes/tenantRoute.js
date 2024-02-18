const 
express = require('express'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),
  verifyToken = require('../middleware/VerifiedToken'),


{   getAllRentDetailsTenent, 
    applyForRooom,
    viewRoomDetails,
    checkOut, 
    availableForBooking, 
    getTenantDetails } = require('../controllers/tenantController');

// use tenant Route

router.get('/get-tenant-rent-details',verifyToken,verifyToken,getAllRentDetailsTenent)
router.get('/view-room-details/:id',verifyToken,viewRoomDetails)
router.post('/apply-for-room/:id',verifyToken,applyForRooom)
router.get('/checkOut-tenant/:id',verifyToken,checkOut)
router.get('/availabe-for-booking/:id',verifyToken,availableForBooking)
router.get('/get-tenant-details/:id',verifyToken,getTenantDetails)

module.exports= router; 