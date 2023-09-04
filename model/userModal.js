const mongoose =require('mongoose')

const userSchema =mongoose.Schema({
    email:{
        type: String,
        require: true,
    },
    admin: {
        type: Boolean,
        default: false
    },
   
},{
    timestamps:true
})
module.exports =mongoose.model('User',userSchema)