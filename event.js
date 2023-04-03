import ctx from './context.js'
import { error, log, write } from './util.js'


async function getStatus() {
  try {
    const status = await ctx.got('http://192.168.82.10/status')
    return status
  } catch(e) {
    return null
  }
}

async function handleEvent(params = {}) {
  try {
    const status = await getStatus()
    await write({
      ...params,
      status
    })
    return { ok: true }
  } catch (e) {
    error(e)
  }
}

export default handleEvent
