import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dayjs from 'dayjs'


export function format(args) {
  return dayjs().format() + '  |  ' + args.join('  |  ') + '\n'
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
  console.log(log, args)
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    await fs.appendFile(path.join(__dirname, 'log.txt'), format(args))
    return { ok: true }
  } catch (e) {
    error(e)
  }
}

export default {
  error,
  log
}
