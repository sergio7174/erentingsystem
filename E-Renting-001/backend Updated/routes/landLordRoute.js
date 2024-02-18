const 
express = require('express'),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),
  verifyToken = require('../middleware/VerifiedToken'),


   {
    addRentDetails,
    deleteRentDetails,
    getallRentDetails,
    editRentDetails,
    notifiLandlord,
    approveBooking,
    rejectBooking,
    getBookingDetails,
    getTenantBookingDetails,
    getTotalRooms,
    getAllApprovedRoooms,
    getAllPendingRooms,
    graph


} = require('../controllers/LandLordController');

// use LandLordRoutes

router.get('/send-notification/:id',verifyToken, notifiLandlord)
router.post('/add-rent-details', verifyToken,addRentDetails)
router.delete('/delete-rent-details/:id',verifyToken, deleteRentDetails)
router.get('/get-all-rent-details/:id',verifyToken, getallRentDetails)
router.put('/edit-rent-details/:id', verifyToken,editRentDetails)
router.put('/approve-booking/:id',verifyToken,approveBooking)
router.get('/get-booking-details/:id',verifyToken,getBookingDetails)
router.get('/get-tenant-booking-details/:id',verifyToken,getTenantBookingDetails )
router.get('/get-total-rooms/:id',verifyToken,getTotalRooms)
router.get('/get-all-approved-rooms/:id',verifyToken,getAllApprovedRoooms)
router.get('/get-all-pending-rooms/:id',verifyToken,getAllPendingRooms)
router.get('/landLord-monthly-booking/:id',verifyToken,graph)
router.delete('/reject-booking/:id',verifyToken,rejectBooking)

module.exports = router