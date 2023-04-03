import ctx from './context.js'
import { error, log } from './util.js'


async function status(params = {}) {
  try {
    const { events } = ctx.db.data
    return events[events.length - 1]
  } catch (e) {
    error(e)
  }
}

export default status
