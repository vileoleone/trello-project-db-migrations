module.exports = (value) => {
  if (value) {
    return new Date(Number(value) * 1000)
  }
  return null
}
