const log = (...args: any): void => {
  if (typeof (console) !== 'undefined') {
    console.error.apply(console, args)
  }
}

const logError = (...args: any): void => {
  const e = process?.env?.LOG_ERRORS
  const g = (global as any)?.logErrors?.toString()

  const print = (e || g || '').toLowerCase().startsWith('t') // eslint-disable-line

  if (print === true) {
    log(...args)
  }
}

export {
  logError
}
