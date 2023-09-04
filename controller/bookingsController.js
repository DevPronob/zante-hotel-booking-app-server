const Payment = require('../model/paymentModal');


const getBookings = async (req, res) => {
    const  {email}  = req.params;

    try {
      const payments = await Payment.find({ email });
      return res.status(200).json(payments);
    } catch (error) {
      console.error('Error fetching service requests:', error);
      return res.status(500).json({ error: 'Error fetching service requests' });
    }
    console.log(email)
  };

  const getAllBookings = async (req, res) => {
   
    try {
        const bookings = await Payment.find();
        return res.status(200).json(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  };



  module.exports ={
    // setPost,
    getBookings,
    getAllBookings
    // getUserPost
  }