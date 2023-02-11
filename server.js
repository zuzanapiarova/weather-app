if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const OPENWEATHER_MAP_KEY = process.env.OPENWEATHER_MAP_KEY
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${OPENWEATHER_MAP_KEY}&units=metric`
    axios({
        url: url, 
        responseType:'json'
    }).then(data => res.json(data.data))
})

app.listen(3000, () => {
    console.log('server started')
})