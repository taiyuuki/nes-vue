export function ignoreSourceError(fun: Function) {
  try {
    fun()
  }
  catch (e) {
    return
  }
}

function digitComplement(n: number) {
  return String(n).length === 1 ? `0${n}` : String(n)
}

export function getNow() {
  const time = new Date()
  let result = time.getFullYear() + '-'
  result += (time.getMonth() + '-')
  result += (time.getDay() + '_')
  result += (digitComplement(time.getHours()) + '-')
  result += (digitComplement(time.getMinutes()) + '-')
  result += (digitComplement(time.getSeconds()))
  return result
}