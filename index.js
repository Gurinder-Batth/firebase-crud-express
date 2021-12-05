const express = require("express")
const app = express()
const bodyPraser = require("body-parser")
const multer = require("multer")


app.use( bodyPraser.json() )
app.use( bodyPraser.urlencoded({ extended:true }) )
app.use( multer().array() )
app.set('view engine','pug')
app.set('views','./views');
app.use(  '/public' , express.static('public') )


app.use( require("./contact-middleware") )
app.use( require('./router') )

app.listen(3000)