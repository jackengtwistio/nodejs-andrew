const express = require('express')
const path = require('path')
const hbs = require('hbs')
const {getWeather,geoCode} = require('../openWeather')
const app = express()
const port = 3000


const viewPath = path.join(__dirname, '../public/views')
const partialPath = path.join(__dirname, '../public/partials')
const publicPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.get('/', (req, res) =>{
    res.render('main',{
        title: 'Welcome to weather page',
        user:'jack'
    })
})

app.get('/weather', async (req, res) =>{
    let location = req.query.location
    const weatherBody = await geoCode(location,async (error,response)=>{
        const { lat, lon } = response
        if(error){ return console.log(`error: ${error}`)}
        getWeather(lat,lon,(error, weatherObj)=>{
            if(error){ return res.send(error)}
            else{
                res.render('weather',{
                    weatherObj,
                    forecast:'forecast',
                    location:location}
                )
            }
        })
        
    }) 
    if(location){
        weatherBody
    }else{
        res.redirect('/pageNotFound')
    }
    
})

app.get('/about', (req, res) =>{
    res.render('about', {
        user: 'about'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound')
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })