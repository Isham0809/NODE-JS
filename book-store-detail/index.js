const express = require('express')
const db = require('./config/database')
const bodyParser = require('body-parser')
const book = require('./models/userSchema')

const port = 8081

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('node_modules'))
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    book.find({}).then((data)=>{
        return res.render('index',{
            data
        })
    }).catch((err)=>{
        return false
    })
})

app.post('/insertData',(req,res)=>{
    let editId = req.body.editId

    if(editId){
        book.findByIdAndUpdate(editId, {...req.body}).then((data)=>{
            console.log("Book Data Updated")
            return res.redirect('/')
        }).catch((err)=>{
            console.log(err)
            return false
        })
    }
    else{
        book.create({...req.body}).then((data)=>{
            return res.redirect('/')
        }).catch((err)=>{
            console.log(err)
            return false
        })
    }
})

app.get('/deleteData/:id', (req, res) => {
    let { id } = req.params
    book.findByIdAndDelete(id).then((data) => {
        console.log(data)
        console.log("Book Data Deleted...")
        return res.redirect('/')
    }).catch((err) => {
        console.log('Error...')
        return false
    })
})

app.get('/editData/:id', (req, res) => {
    let { id } = req.params
    book.findById(id).then((data) => {
        return res.render('edit', {
            data
        })
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.listen(port, (err) => {
    if (!err) {
        db
        console.log("server Start \nhttp://localhost:" + port);
    }
})