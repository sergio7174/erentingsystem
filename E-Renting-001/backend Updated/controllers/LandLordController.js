const rentDetailsModel = require('../models/rentDetails')
const bookings = require('../models/bookings')
var ObjectID = require('mongodb').ObjectID
const UserModel = require('../models/User')
// const User = require('../models/User')




exports.notifiLandlord = async(req, res) => {
    const query = { landLordId: req.params.id, landLordChecked: false }

    bookings.find(query, (err, doc) => {
        if (err) {
            return res.send(err)
        } else {
            return res.status(200).json(doc)
        }
    })
}
// add Rent Room - drop down menu - option Rent List - button Add Room - modal add Room
exports.addRentDetails = async(req, res) => {
  const addRoomDetails = new rentDetailsModel(req.body)
    const {landLordId} = req.body 
    // console.log(req.body)
      UserModel.findByIdAndUpdate(landLordId,{$inc:{totalRooms:1}},{new:true},(err,doc)=>{
          if(err){
              res.json(err)
          }else{
              addRoomDetails.save((err,doc)=>{
                  if(err){
                      res.json(err)
                  }else{
                      res.status(200).json({info:'Details saved Successfully'})
                  }
              })
          }
      })



}
// show the all rent details -option rent-list - dropdown menu - button empty trash(garbage)
exports.deleteRentDetails = async(req, res) => {
     const {landLordId}=await rentDetailsModel.findById(req.params.id)
    await rentDetailsModel.findByIdAndDelete(req.params.id)
   
    await UserModel.findByIdAndUpdate(landLordId,{$inc:{totalRooms:-1,occupiedRooms:-1}})
    await bookings.findByIdAndDelete(req.params.id)
    res.status(200).json({ messagae: "Room details deleted Successfully" })
},

// show the all rent details -option rent-list - dropdown menu
exports.getallRentDetails = (req, res) => {
   const query = { landLordId: req.params.id }
    rentDetailsModel.find(query, (err, doc) => {
        if (err) {
            res.send(err)
        } else {

            res.status(200).json(doc)
        }
    })

}
// show the all rent details -option rent-list - dropdown menu - button edit
exports.editRentDetails = async(req, res) => {
    await rentDetailsModel.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ messagae: "Updated successfully" })
}

// show the all rent details -option rent-list - dropdown menu - button eye-broken - button apply
exports.approveBooking = async(req, res) => {
    await bookings.findByIdAndUpdate(req.params.id, {
        $set: {
            approvalStatus: "approved",
            landLordChecked: 'true'
        }
    })

    res.status(200).json('approved')

}


exports.rejectBooking = async(req, res) => {
    const {landLordId} = await bookings.findById(req.params.id)

    await bookings.findByIdAndDelete(req.params.id)
    await UserModel.findByIdAndUpdate(landLordId,{$inc:{occupiedRooms:-1}}) 
    res.status(200).json('Rejected')
}



// show the all rent details -option rent-list - dropdown menu - button eye-broken
exports.getBookingDetails = async(req,res)=>{
   const bookingRoom = await bookings.find({
        landLordId:req.params.id,

    }).populate({
        path:'tenantId',
        select:'firstName'
    }).populate({
        path:'roomId',
        select:'roomNo '
    })

    res.status(200).json(bookingRoom)
}

// show the all rent details -option rent-list - dropdown menu - button eye-broken - Tenant
exports.getTenantBookingDetails = async(req, res) => {
    
    const tenantDetails = await bookings.find({
        landLordId: req.params.id,
        approvalStatus: 'approved'
    }).populate({
        path: 'tenantId',
        select: 'firstName lastName address contact email'
    }).populate({
        path:'roomId',
        select:'roomNo'
    })
   
    res.status(200).json(tenantDetails)
}

// show totals rooms booked in dasboardview square Total Rooms
exports.getTotalRooms = (req, res) => {
   rentDetailsModel.find({ landLordId: req.params.id }, (err, doc) => {
        if (err) {
            res.status(409).json(err)
        } else {
            res.status(200).json(doc)
        }
    })
}
// show totals rooms booked in dasboardview square Approved Rooms
exports.getAllApprovedRoooms = (req, res) => {
    bookings.find({ landLordId: req.params.id, approvalStatus: 'approved' }, (err, doc) => {
        if (err) {
            res.status(409).json(err)
        } else {
            res.status(200).json(doc)
        }
    })
}

// show totals rooms booked in dasboardview square Pending Rooms
exports.getAllPendingRooms = async(req, res) => {
    bookings.find({ landLordId: req.params.id, approvalStatus: 'pending' }, (err, doc) => {
        if (err) {
            res.status(409).json(err)
        } else {
            res.status(200).json(doc)
        }
    })
}
// show totals rooms booked in dasboardview graph bookings per month
exports.graph = (req, res) => {
    bookings.aggregate([
        { $match: { landLordId: new ObjectID(req.params.id) } },
        { $group: { _id: { $month: "$bookedAt" }, count: { $count: {} } } },
        { $sort: { _id: 1 } }



    ], (err, doc) => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(doc)
        }
    })
}