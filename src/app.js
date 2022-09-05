const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static directory to serve
app.use(express.static(publicPath))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',  (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ece Erol'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Ece Erol'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ece Erol',
        helpText: 'This is a help text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lat, lon, name } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                name,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error Page',
        errorMessage: 'Article not found.',
        name: 'Ece Erol'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error Page',
        errorMessage: '404 NOT FOUND',
        name: 'Ece Erol'
    })
})

// starts server at port 3000
app.listen(3000, () => {
    console.log("Server has started at port 3000");
})