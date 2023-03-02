export function ignoreSourceError(fun: Function) {
  try {
    fun()
  }
  catch (e) {
    return
  }
}