const localStorageAvailable = (): boolean => {
  try {
    const x = '__storage_test__'
    localStorage.setItem(x, x)
    localStorage.removeItem(x)
    return true
  } catch {
    // swallow all errors
    return false
  }
}

export { localStorageAvailable }
