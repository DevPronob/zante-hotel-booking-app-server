const Room = require('../model/hotelModal');

// const setPost =async(req, res) => {
//     const newPost = new Post(req.body);
//     try {
//       const savedPost = await newPost.save();
//       res.status(200).json(savedPost);
//     } catch (err) {
//       res.status(401).json(err);
//       console.log(err)
//     }
//   };

  const getHotel = async (req,res) => {
    try {
        const posts = await Room.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const filterRooms = async (req,res) => {
  const { startDate, endDate, adults, children } = req.query;

  // Convert query parameters to numbers
  const parsedAdults = parseInt(adults);
  const parsedChildren = parseInt(children);
  
  // Check if all parameters are 0, and if yes, return all data
  if (parsedAdults === 0 && parsedChildren === 0) {
    try {
      const allRooms = await Room.find();
      return  res.json(allRooms);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred' });
    }
    return; // Exit the function early
  }
  
  // const parseDate = (dateString) => {
  //   const [month, day, year] = dateString.split('/');
  //   // Months are zero-based in JavaScript's Date, so subtract 1 from the month
  //   return `${year}-${month}-${day}`;
  // };
  
  // const parseStartDate = parseDate(startDate);
  // const parseEndDate = parseDate(endDate);
  // console.log(parseStartDate,parseEndDate,"ooooo",startDate,endDate)
  try {
    const filteredRooms = await Room.find({
      'date.startingDate': { $lte: startDate }, // Room's startingDate is before or on the selected endDate
      'date.endDate': { $gte: endDate }, // Room's endDate is after or on the selected startDate
      'maxGuests.Adults': { $gte: parsedAdults },
      'maxGuests.Children': { $gte: parsedChildren },
      // Room's max guests should be greater than or equal to selected maxGuests
    });
    if(filteredRooms == ""){
      const allRooms = await Room.find();
      return  res.json(allRooms);
    }
  
    return res.json(filteredRooms);
    console.log(filteredRooms)
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
}



//   const getUserPost = async (req,res) => {
//    const userBlog =req.query.user;
//    Post.find({ email: userBlog}, function (err, docs) {
//     if (err){
//       res.status(401).json(err);
//     }
//     else{
//       res.status(200).json(docs);
//     }
// });
    
// }


  const getHotelDetail = async (req,res) => {
 const roomtId =req.params.id;
 try{
    Room.findById(roomtId).then((room) =>{
     return res.send(room)
    })
 } catch(err) {
  return res.status(403).json(err);
 }
}


const setRoom = async (req,res) => {
  try {
    // Destructure data from the request body
    const {
      name,
      description,
      roomServices,
      price,
      maxGuests,
      date,
      images,
    } = req.body;

    // Create a new Room instance with the provided data
    const newRoom = new Room({
      name,
      description,
      roomServices,
      price,
      maxGuests,
      date,
      images,
    });

    // Save the new Room instance to the database
    await newRoom.save();

    return res.status(201).json({ message: 'Room added successfully' });
  } catch (error) {
    console.error('Error adding room:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
 }

  module.exports ={
    setRoom,
    getHotel,
     getHotelDetail,
     filterRooms
    // getUserPost
  }