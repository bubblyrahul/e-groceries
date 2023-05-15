const jwt = require("jsonwebtoken")
const JWT_RANDOM_STR = "qwerty"

const FetchUser = (req, res , next) =>{
    const token = req.header('token')
    if(!token){
        return res.status(400).send({errors:"token not present"})
    }
    try{
        const decoded = jwt.verify(token, JWT_RANDOM_STR)
        req.user= decoded.user

        next()
    }
    
    catch(errors)
    {
        return res.status(400).send({errors:"please authenticte using valid token"})
        
    }
}

module.exports = FetchUser
