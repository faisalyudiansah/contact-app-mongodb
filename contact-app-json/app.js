const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors')
const app = express()
const port = 3000
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const router = require('./routes');

app.use(cors())
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())

app.use(router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})