const router = require('express').Router()
let data = []
const colorlist = ['#ffd700', '#00ff7f', '#87cefa']

router.get('/data', (req, res) => {
  res.json(data)
})

router.post('/data', (req, res) => {
  data = req.body
  res.json(data)
})

router.post('/delete', (req, res) => {
  data.splice(req.body.index, 1)
  res.json(data)
})

router.post('/move', (req, res) => {
  data[req.body.index] = {
    toppo: req.body.toppo,
    left: req.body.left,
    text: req.body.text,
    background: req.body.background
  }
  res.json(data)
})

router.post('/text', (req, res) => {
  data[req.body.index].text = req.body.text
  res.json(data)
})

router.post('/color', (req, res) => {
  data[req.body.index].background = colorlist[req.body.color]
  res.json(data)
})

module.exports = router
