import fs from 'fs/promises'
import path from 'path'
import ctx from './context.js'
import { error, log } from './util.js'


async function clean(params = {}) {
  try {
    await fs.unlink(path.join(ctx.dirname, 'log.txt'))
    await fs.unlink(path.join(ctx.dirname, 'db.json'))
    return { ok: true }
  } catch (e) {
    error(e)
  }
}

export default clean
