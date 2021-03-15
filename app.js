require('dotenv').config()
const express = require('express')
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
const User = require('./model/User')


const PORT = process.env.PORT || 3000;

app.engine('.ejs',ejs.__express);
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=> {
    console.log(`Connected to DB: ${mongoose.connection.host}`)
}).catch((error)=> {
    console.log(`Error connecting to DB: ${error}`)
})

const connection = await mongoose.connection.host;



app.get('/', (req, res) => {
    res.render('index', {connection : connection})
})

app.get('/createuser', async (req,res) => {
    var user = new User({
        name: 'John',
        email: 'john@gmail.com',
        password: 'password'
    })
    await user.save()
    res.send(`User created: ${user.name}`)
} )

app.get('/getusers', async (req,res) => {
    users = await User.find()
    res.render('users',  {users : users})
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

