const express =require("express")
const router =express.Router()
const {setRoom,getHotel,getHotelDetail,filterRooms} = require('../controller/hotelController')
const {
    verifyToken,
    verifyTokenAndAdmin
  } = require("./verifyToken");
router.get('/hotel',getHotel )
router.get('/hotel/:id',verifyToken, getHotelDetail)
router.get('/rooms', filterRooms)
router.post('/add-room',verifyToken,verifyTokenAndAdmin,setRoom)
// router.get('/:id',verifyToken, getPostDetail)
// router.get('/blog/me',verifyToken, getUserPost)
// router.post('/',verifyToken, setPost)
// router.put('/:id', putPost)
// router.delete('/:id', deletePost)

module.exports = router;