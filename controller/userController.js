const User = require("../model/userModal");
const jwt =require('jsonwebtoken')
const setUser =async(req, res) => {
    console.log(req.body)
    const email =req.body;
    const exist = await User.findOne(email)
    if(exist){
        // const accessToken =jwt.sign({
        //     email:email,
        //     // admil:savedPost.admin
        //   },process.env.JWT_SEC,
        //   {expiresIn:"3d"}
        //   );
        const token =jwt.sign({ email:exist.email,admin:exist.admin }, "shhh", { expiresIn: '3d' })
        return  res.status(400).json({exist,token})
    }
    else{

        const newPost = new User(email);
    try {
      const savedPost = await newPost.save();
      const token =jwt.sign({ email: savedPost.email,admin:savedPost.admin }, "shhh", { expiresIn: '3d' })
      return  res.status(200).json({savedPost,token});
    } catch (err) {
      return res.status(403).json(err);
      console.log(err)
    }

    }
    
  };

  const getAdmin = async (req,res) => {
    const email = req.params.email;
    console.log(req.user?.email)

  try {
    if (req.user.email !== email) {
      return res.send({ admin: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ admin: false });
    }
    const result = { admin: user.admin };
    return res.send(result);
  } catch (error) {
    console.error('Error fetching user:', error);
   return  res.status(500).send({ error: 'An error occurred' });
  }
   }

   const getAllUser = async (req,res) => {
    try {
        const users = await User.find(); // Fetch all documents from the "Room" collection
        return res.status(200).json(users); // Return the fetched data as a JSON response
      } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
   }
   const makeAdmin = async (req,res) => {
        const { id } = req.params; // Assuming the _id is passed in the request params
    
        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { admin: true },
                { new: true }
            );
    
            if (updatedUser) {
                res.json({ message: 'Admin field updated successfully', user: updatedUser });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        console.log(id)
    }


  module.exports ={
    setUser,
    getAdmin,
    getAllUser,
    makeAdmin
  }