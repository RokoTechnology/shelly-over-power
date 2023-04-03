import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import ctx from './context.js'
import { log } from './util.js'
import handleEvent from './event.js'
import clean from './clean.js'
import status from './status.js'


const app = express()
app.use(bodyParser.json())

async function init() {
  try {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    ctx.set('dirname', dirname)
    const db = new Low(new JSONFile(path.join(dirname, 'db.json')))
    await db.read()
    db.data = db.data || { events: [] }
    ctx.set('db', db)
    const myGot = got.extend({
      responseType: 'json',
      resolveBodyOnly: true
    })
    ctx.set('got', myGot)
  } catch (e) {
    log(e)
  }
}

try {
  app.all(['/', '/event'], async (req, res) => {
    const payload = req.body || req.query || {}
    log(`received ${req.method} request at /`)
    const result = await handleEvent(payload)
    res.send(result)
    return
  })

  app.all('/test', async (req, res) => {
    const payload = req.body || req.query || {}
    payload.isTest = true
    const result = await handleEvent(payload)
    res.send(result)
    return
  })

  app.all('/clean', async (req, res) => {
    const payload = req.body || req.query || {}
    const result = await clean(payload)
    res.send(result)
    return
  })

  app.all('/status', async (req, res) => {
    const payload = req.body || req.query || {}
    const result = await status(payload)
    res.send(result)
    return
  })

  app.listen(ctx.port, async () => {
    await init()
    log('Shelly OverPower listening on port', ctx.port)
  })
} catch (e) {
  log(e)
}
