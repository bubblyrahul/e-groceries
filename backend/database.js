// database connection 

const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017/groceries';

async function connecToMongo(){
    try{
        await mongoose.connect(connectionUrl)
        console.log('MongoDB is connected successful')
    }catch(err){
        console.log('MongoDB connection is failed:',err)
    }
}

module.exports = connecToMongo