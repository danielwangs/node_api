const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');

var app = express();
app.use(bodyParser.json);

app.get('/hello', (req,res) =>{
    res.status(200).json({
        message : "Hello word!!"
    })
})

app.listen(5000, () => {
    console.log(moment().tz("Asia/Taipei").format());
    console.log("http//localhost:3000"); 
    
})