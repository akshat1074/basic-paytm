import express from 'express';
import zod from 'zod';
const router = express.Router();
const {JWT_SECRET}=require("../config")
const {authMiddleware} = require("../middleware")

const signupSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    password:zod.string(),
})


router.post('/signup',async function(req,res){
  const body = req.body;
  const{success} = signupBody.safeParse(req.body)
  if(!success){
    return res.status(411).json({
      message:"Email already taken/Incorrect inputs"
    })
  }
  const existingUser= await User.findOne({
    username:req.body.username
  })

 if(existingUser){
  return res.status(411).json({
    message:"Email already taken/Incorrect inputs"
  })
 }

 const user = await User.create({
    username:req.body.username,
    password:req.body.password,
    firstName:req.body.firstName,
    lastName:req.body.lastName
 })
  const userId = user._id;

  const token = jwt.sign({
    userId
  },JWT_SECRET);

  res.json({
    message:'User created successfully',
    token:token
  })
})


const signinBody=zod.object({
  username:zod.string().email(),
  password:zod.string()
})


router.post("/signin",async(req,res)=>{
  const {succes} = signinBody.safeParse(req.body)
  if(!success){
    return res.status(411).json({
      message:"Email already taken/Incorrect inputs"
    })
  }

  const user = await User.findOne({
    username:req.body.username,
    password:req.body.password
  });
  if(user){
    const token = jwt.sign({
      userId:user._id
    },JWT_SECRET);

    res.json({
      token:token
    })
    return;
  }
  res.status(411).json({
    message:"Error while logging in"
  })
})

const updateBody=zod.object({
  password:zod.string().optional(),
  firstName:zod.string().optional,
  lastname:zod.string().optional(),
})

router.put("/",authMiddleware,async(req,res)=>{
  const{succes}=updateBody.safeParse(req.body)
  if(!succes){
    res.status(411).json({
      message:"Error while updating information "
    })
  }

  await User.updateOne({_id:req.userId},req.body)
  
  res.json({
    message:"Upadated successfully"
  })

})

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await user.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
})
module.exports = router;