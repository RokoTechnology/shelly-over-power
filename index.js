import express from 'express'
import bodyParser from 'body-parser'
import cfg from './config.js'
import handleEvent from './event.js'
import { log } from './log.js'


const app = express()
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  log('received GET')
  const result = await handleEvent(req.query)
  res.send(result)
  return
})

app.post('/', async (req, res) => {
  log('received POST')
  const result = await handleEvent(req.body)
  res.send(result)
  return
})


app.listen(cfg.port, async () => {
  log('Shelly Overload listening on port', cfg.port)
})
