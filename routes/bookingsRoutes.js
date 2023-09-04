const express =require("express")
const router =express.Router()
const {getBookings,getAllBookings,getHotelDetail,filterRooms} = require('../controller/bookingsController')
const {
    verifyToken,
  } = require("./verifyToken");
router.get('/bookings/:email',verifyToken,getBookings )
router.get('/bookings/',verifyToken,getAllBookings)

// router.get('/:id',verifyToken, getPostDetail)
// router.get('/blog/me',verifyToken, getUserPost)
// router.post('/',verifyToken, setPost)
// router.put('/:id', putPost)
// router.delete('/:id', deletePost)

module.exports = router;