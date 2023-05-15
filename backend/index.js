//import
const express = require('express')
const cookieParser = require('cookie-parser')
const Payment = require("./route/Payment")

const app = express();
const port = 5000
app.use(cookieParser())
const cors = require('cors')
app.use(cors({
    origin: "http://localhost:3000", // Replace with your React app's URL
    credentials: true // Allow cookies, authorization headers, etc. to be sent
  }));

//database connection
const connecToMongo = require('./database')
connecToMongo()

//middleware function access between frontend and backend 
app.use(express.json());

app.get('/',(req,res) => {
    res.send('welcome')
})

app.listen(port,()=>{
    console.log("server gets started")
})

app.post('/',(req,res) =>{
    res.send('data fetched sucessfull')
})

//router connection
app.use('/api',require('./route/auth'))
app.use('/api',require('./route/Product'))

app.use('/api',require('./route/Payment'))



