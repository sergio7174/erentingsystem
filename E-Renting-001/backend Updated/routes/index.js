"use strict";

// require express module

const
 express = require("express"),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),

 authRoutes = require('./authRoute'),
 landLordRoutes = require('./landLordRoute'),
 tenantRoutes = require('./tenantRoute'),
 adminRoutes = require('./adminRoute'),
 sharedRoutes = require('./sharedRoute');


router.use('/api/auth', authRoutes);
router.use('/api/landlord', landLordRoutes);
router.use('/api/tenant', tenantRoutes);
router.use('/api/admin',adminRoutes);
router.use('/api/shared',sharedRoutes);






  module.exports = router;