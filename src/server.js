// code test
// const express = require('express')
// const app = express()
// const port =3000
// app.get('/',(req,res)=>
// {

//     res.send("hello world sly ")
// })
// app.get("/",(req,res)=>
// 

import express from 'express';
import configViewEngine from './configs/viewEngine';

import initWebRoute from './route/web';

import initAPIRoute from './route/api'
require('dotenv').config()
var morgan = require('morgan')
const app = express();
const port = process.env.PORT || 8080

app.use((req, res, next) => {

    console.log(" run into my middleware")
    console.log("-----",req.method)
    console.log("+++++")
    next();
}

)
app.use(morgan('combined'))

// SET UP THIS CONFIG FOR EASY SEND DATA FROM CLIENT TO SERVER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




configViewEngine(app)

// app.get('/', (req, res) => {
//     res.render('test/index.ejs')
// })
// app.get('/about', (req, res) => {
//     res.send(`I'm Eric!`)
// }
// )

// setup view engine
configViewEngine(app)

// init web route
initWebRoute(app);
// init routeAPI
initAPIRoute(app)
app.use((req, res) => {
    return res.render('404.ejs')
}
)
// 
app.listen(port, () => {
    console.log(`example app listennig  on port http://localhost:${port}`)
})
