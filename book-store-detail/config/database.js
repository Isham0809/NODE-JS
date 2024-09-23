const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rnwisha6935:isha456@bookdata.xqowa.mongodb.net/')

const db = mongoose.connection

db.on('connected',(err)=>{
    if(err){
        console.log('Database not connected...')
        return false
    }
    console.log('Database connected...')
})

module.exports = db