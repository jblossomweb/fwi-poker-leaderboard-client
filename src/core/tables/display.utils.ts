// NOTE: outer scope. don't create regex with each invocation.
const formatBigNumberRegex = new RegExp('/\.0+$|(\.[0-9]*[1-9])0+$/')
export const formatBigNumber = (
  num: number,
  digits: number,
) => {
  const symbols = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'k' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'G' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'P' },
    { value: 1E18, symbol: 'E' }
  ]
  let i
  for (i = symbols.length - 1; i > 0; i--) {
    if (num >= symbols[i].value) {
      break
    }
  }
  const displayValue = (num / symbols[i].value)
    .toFixed(digits)
    .replace(formatBigNumberRegex, '$1')
  return displayValue + symbols[i].symbol
}
