const catalog = require('express').Router()

catalog.get('/', (req, res) => {
    res.send('hello from GET catalog')
})

catalog.post('/', (req, res) => {
    res.send('hello from POST catalog')
})

module.exports = catalog
