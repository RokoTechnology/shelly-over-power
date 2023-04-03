import ctx from './context.js'
import { error, log, write } from './util.js'


async function handleEvent(params = {}) {
  try {
    await write(params)
    return { ok: true }
  } catch (e) {
    error(e)
  }
}

export default handleEvent
