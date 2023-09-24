const express =require("express");
const app =express()
app.use(express.json());
const cors = require('cors');
app.use(express.urlencoded({ extended : true }));
app.use(cors());
require('dotenv').config();
const connectDB =require('./database/db')


const allowedOrigins = ["https://hotel-booking-site-dbed7.web.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));


app.use('/api', require('./routes/hotelRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/', require('./routes/PaymentRoutes'))
app.use('/api', require('./routes/bookingsRoutes'))
// app.get('/api/user', (req,res) =>{
//     res.send("pronob")
// })
// app.use('/api', require('./routes/userRoutes'))
// app.use('/pay/webhook', require('./routes/cartPaymentRoutes'))
app.listen(process.env.PORT,() =>{
    console.log("Server is running")
})

connectDB()
// EEDn6Kf2JEXGlPrk
// pronobroy3601