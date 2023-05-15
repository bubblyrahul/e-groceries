const Users = require('../models/Users')
const express = require('express')
const router = express.Router();
const {body,validationResult} = require("express-validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const FetchUser = require('../Middleware/FetchUser')
const Address = require('../models/Address')

const JWT_RANDOM_STR = "qwerty"

//route 1

//signup
const commonPasswords = ["password", "123456", "qwerty", "abc123"];
router.post(
    '/signup',
    [
        //validation part
        body("firstName","Enter a first Name min length should be ").isLength({min:3}),
        
        body("lastName","Enter vallid last name").isLength({min:1}),
        body("email","Enter valied email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .custom((value) => {
          if (!value.endsWith("@gmail.com")) {
            throw new Error("Email address must be a valid Gmail address");
          }
          return true;
        }),
        body("password","Enter a Name min length should be 5")
        .isLength({min:8})
        .withMessage("Password must be at least 8 characters long")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/
        )
        .withMessage(
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    ],
    
    async(req,res) =>{

         let success = false
        //Email ID unique
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{


           //user exists or not or fetching email
           let user = await Users.findOne({email:req.body.email});
           if (user){
            return res.status(400).json({errors:"Enter a unique Email ID"});
           }

           //hashing password
           const salt = await bcrypt.genSalt(15);
           const hashPassword = await bcrypt.hash(req.body.password,salt);


           //create the user
           user = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
           });
            success = true
            res.status(200).json({success,message:"User Registered Successful"})

        }catch(error){
            console.log(error);
            res.status(500).json({errors:"Internal server error"})
        }
        
    }
)

//route 2
router.post(
    '/login',
    
        //validation part
        body("email","Enter valid email").isEmail()
        .withMessage("Enter a valid email address")
        .custom((value) => {
          if (!value.endsWith("@gmail.com")) {
            throw new Error("Email address must be a valid Gmail address");
          }
          return true;
        }),
        body("password","Enter a Name min length should be 5").exists(),
    
   
    async(req,res)=>{
        let success = false
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
           
     
        try{
            const user = await Users.findOne({email:req.body.email})
            if(!user){
                return res.status(400).json({errors:"User entry not available!!"})
            }
          
          //comparing the password and hashpassword
            const isvalid = await bcrypt.compare(req.body.password,user.password)
            if (!isvalid) {
                return res.status(400).json({
                  error: "Please try to login using correct credentials !!!",
                });
              }
            
            

            let data = {
                user:{
                    id: user._id
                }
            }           
            let token = jwt.sign(data,JWT_RANDOM_STR,{expiresIn:'2h'})
            success = true
            //cookie.remove("User:Token",token);  //set the token as a cookie
            return res.json({success, token })  //return success and token in the response
          
        }
        catch(errors){
           
            return res.status(400).json({errors:"Internal server error"})
        }
    }

)

//module.exports = router;


//route3
// Get User details 
router.get('/get_user',
FetchUser,

async(req, res) => {

try{

  const userId = req.user.id;
      const user = await Users.findById(userId).select("-password")
      res.send(user)

}
catch(errors)
{
    res.status(500).send({error:" internal server error"})
}
}
)



// Get user's address
router.get('/get_address', FetchUser, async (req, res) => {
  try {
    const userAddresses = await Address.find({ userId: req.user.id });
    
    if (!userAddresses || userAddresses.length === 0) {
    
      return res.status(404).json({ message: 'User addresses not found' });
    }
    res.status(200).json({ addresses: userAddresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add user's address
router.post('/new_address', FetchUser, async (req, res) => {
  try {
    // Check if all required fields are present
    const { houseNumber, street, city, state, country, zipCode } = req.body;
    if (!houseNumber || !street || !city || !state || !country || !zipCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userAddress = new Address({
      userId:req.user.id,
      houseNumber,
      street,
      city,
      state,
      country,
      zipCode
    });

    const existingAddress = await Address.findOne({
      houseNumber,
      street,
      city,
      state,
      country,
      zipCode
    });
    if (existingAddress) {
      return res.status(400).json({ message: 'Address already exists' });
    }
    
    // Create new address and save to database
    
    const savedAddress = await userAddress.save();
    res.status(201).json({ address: savedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;