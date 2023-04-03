import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dayjs from 'dayjs'
import ctx from './context.js'


export function formatText(args) {
  args = JSON.stringify(args)
  return dayjs().format() + '  |  ' + args + '\n'
}

export function formatJSON(args) {
  return {
    ts: dayjs().format(),
    data: args
  }
}

export function error(e) {
  const result = {
    error: e && e.messsage || e
  }
  console.log(result)
  return result
}

export async function log() {
  const args = [...arguments]
  console.log('log', args)
  try {
    const text = formatText(args)
    if (text) {
      await fs.appendFile(path.join(ctx.dirname, 'log.txt'), text)
    }
    return { ok: true }
  } catch (e) {
    error(e)
  }
}

export async function write(args) {
  try {
    log(args)
    const json = formatJSON(args)
    ctx.db.data.events.push(json)
    await ctx.db.write()
  } catch(e) {
    log(e)
  }
}

export default {
  write,
  error,
  log
}
