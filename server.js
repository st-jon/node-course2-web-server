const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', hbs)

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// app.use((req, res) => {
//     res.render('maintenance.hbs', {
//         message: 'We are maintening this webpage...'
//     })
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hi ! Welcome to this Page !'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'this is an Error'
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}!`)
})