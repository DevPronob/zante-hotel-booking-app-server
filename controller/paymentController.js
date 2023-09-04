const stripe = require('stripe')(process.env.STRIPE)
const Payment = require('../model/paymentModal');
//   // create payment intent
//   app.post('/create-payment-intent', verifyJWT, async (req, res) => {
//     const { price } = req.body;
//     const amount = parseInt(price * 100);
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd',
//       payment_method_types: ['card']
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret
//     })
//   })

const setPayment = async (req, res) => {
    const { price } = req.body;
    
    // Convert price to the smallest unit of the currency (e.g., cents for USD)
    const amount = parseInt(price * 100);
  
    // Ensure the amount is at least 1 unit in the currency's smallest unit
    if (amount < 1) {
      return res.status(400).json({ error: "Amount must be greater than or equal to 1" });
    }
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd', // Adjust as needed
      payment_method_types: ['card']
    });
  
    return res.send({
      clientSecret: paymentIntent.client_secret
    });
    console.log(paymentIntent.client_secret,"res")
    console.log("buooon")
  };

  const setUserPayment = async (req, res) => {
    const { email, transactionId, name, status,startDate,endDate } = req.body;

    try {
      const newServiceRequest = new Payment({
        email,
        transactionId,
        name,
        status,
        startDate,
        endDate,
      });
  
      const savedServiceRequest = await newServiceRequest.save();
  
      return res.status(201).json(savedServiceRequest);
    } catch (error) {
      console.error('Error creating service request:', error);
      return res.status(500).json({ error: 'Error creating service request' });
    }
  };

  module.exports ={
    // setPost,
    setPayment,
    setUserPayment
    // getUserPost
  }