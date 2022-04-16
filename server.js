const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

try {
    mongoose.connect('mongodb://localhost:27017/node-practical',{ useNewUrlParser: true });
    console.log("connected to database successfully...");
} catch (error) {
    console.log("Getting error to connect with database...");
}


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


let apiRoute = require('./app/route/auth');
app.use('/api',apiRoute);
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })


app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(process.env.PORT,()=> console.log("app is listing on port 6005"));
