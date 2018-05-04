const isParam = (p) => p.indexOf('-') === 0
const hasValue = (p) => p.indexOf('=') > -1
const getVal = (p) => {
  const withEqual = hasValue(p)
  const val = withEqual ? String(p.split('=')[1]) : p
  if (val.toLowerCase() === 'true') return true
  if (val.toLowerCase() === 'false') return false
  return val
}

const hasTrace = (str) => str.indexOf('-') > 0

const replaceTrace = (str) => {
  const pos = str.indexOf('-')
  const parts = str.split('')
  parts.splice(pos, 1)
  parts[pos] && (parts[pos] = parts[pos].toUpperCase())
  return parts.join('')
}

const clearParam = (p) => {
  const parts = p.split('')
  while (parts[0] === '-') parts.splice(0, 1)

  let param = parts.join('').split('=')[0]
  while (hasTrace(param)) param = replaceTrace(param)

  return param
}

const runBlock = (cond, block) => cond && block()

module.exports = () => {
  let argv = {}
  let nextVal = false

  const setParam = (val) => {
    nextVal = !hasValue(val)
    const param = clearParam(val)
    argv[param] = nextVal ? true : getVal(val)
  }

  const setOldParam = (val, index) => {
    nextVal = false
    const param = clearParam(process.argv[index - 1])
    const value = getVal(val)
    argv[param] = value
  }

  process.argv.forEach((val, index) => {
    const isBin = index === 0
    const isFile = index === 1
    const ifParam = index > 1 && isParam(val)
    const isValue = index > 1 && nextVal

    runBlock(isBin, () => (argv.$bin = val))
    runBlock(isFile, () => (argv.$file = val))
    runBlock(ifParam, () => setParam(val))
    runBlock(isValue, () => setOldParam(val, index))
  })

  return argv
}
