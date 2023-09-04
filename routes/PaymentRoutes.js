const express =require("express")
const router =express.Router()
const {setPayment,setUserPayment,getHotelDetail,filterRooms} = require('../controller/paymentController')
const {
    verifyToken,
  } = require("./verifyToken");
router.post('/create-payment-intent',verifyToken,setPayment)
router.post('/payments',verifyToken,setUserPayment)

// router.get('/:id',verifyToken, getPostDetail)
// router.get('/blog/me',verifyToken, getUserPost)
// router.post('/',verifyToken, setPost)
// router.put('/:id', putPost)
// router.delete('/:id', deletePost)

module.exports = router;