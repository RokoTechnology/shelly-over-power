import ctx from './context.js'
import { error, log } from './util.js'


async function status(params = {}) {
  try {
    const { events } = ctx.db.data
    let last = events[events.length - 1]
    if (!last) {
      last = { ok: true }
    }
    return last
  } catch (e) {
    error(e)
  }
}

export default status
