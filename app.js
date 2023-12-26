const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors')
const app = express()
const port = 3000
const router = require('./routes');

app.use(cors())
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})