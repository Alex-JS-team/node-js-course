var express = require('express')
var app = express()
var path = require('path')
const port = 3000

app.use('/static', express.static(path.join(__dirname, '../../../practice')))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))