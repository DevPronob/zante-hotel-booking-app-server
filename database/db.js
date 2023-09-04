// pronobroy3601
// 5M2NzLsAbYkm5huz
const mongoose = require('mongoose')
const dotenv =require('dotenv')
dotenv.config()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://pronobroy3601:5M2NzLsAbYkm5huz@cluster0.ldgi3k4.mongodb.net/hotelBooking?retryWrites=true&w=majority`)

    console.log(`MongoDB Connected: `)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB

