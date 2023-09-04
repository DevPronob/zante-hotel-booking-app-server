const express =require("express")
const router =express.Router()
const {setUser,getAdmin,getAllUser,makeAdmin} = require('../controller/userController')
const {
    verifyToken,
    verifyTokenAndAdmin
  } = require("./verifyToken");
router.post('/', setUser)
router.get('/users/admin/:email',verifyToken,getAdmin)
router.get('/',verifyToken, getAllUser)
router.patch('/users/admin/:id',verifyToken,verifyTokenAndAdmin, makeAdmin)
// router.get('/users/admin/', makeAdmin)


module.exports = router;