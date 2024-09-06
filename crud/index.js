const express = require('express');

const port = 8081;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded())

let students = [
    {
        id: 11,
        username: "Isha",
        email: "isha@gmail.com",
        password: "isha@123"
    },
    {
        id: 12,
        username: "Janvi",
        email: "janvi@gmail.com",
        password: "janvi@123"
    },
    {
        id: 13,
        username: "Afiya",
        email: "afiya@gmail.com",
        password: "afiya@123"
    },
    {
        id: 14,
        username: "Heer",
        email: "heer@gmail.com",
        password: "heer@123"
    }
]

app.get('/', (req, res) => {
    return res.render('form',{
        students
    });
})

app.post('/insertdata',(req,res)=>{
    students.push(req.body)
    return res.redirect('/');
})

app.get('/deleteData', (req, res) => {
    let { id } = req.query;
    let data = students.filter((student) => {
        return student.id != id;
    })
    students = data
    return res.redirect('/');
})

app.get('/editData', (req, res) => {
    let { id } = req.query;
    let data = students.filter((student) => {
        return student.id == id;
    });

    return res.render('edit', {
        data: data[0]
    });

})

app.listen(port, (err) => {
    if (err) {
        console.log("Server not start.");
        return false;
    }
    console.log("Server Start http://localhost:" + port);
})