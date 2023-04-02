import cfg from './config.js'
import { error, log } from './log.js'


async function handleEvent(params = {}) {
  try {
    await log(params)
    return { ok: true }
  } catch (e) {
    error(e)
  }
}

export default handleEvent
