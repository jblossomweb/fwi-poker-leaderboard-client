export const sortAlpha = (
  a: string,
  b: string,
) => {
  if (a !== b) {
    if (a < b) {
      return -1
    }
    return 1
  }
  return a.localeCompare(b)
}

export const sortBySurname = (
  a: string,
  b: string,
) => {
  const words = {
    a: a.split(' '),
    b: b.split(' '),
  }
  const sort = {
    a: words.a.length > 1 ? words.a[1] : a,
    b: words.b.length > 1 ? words.b[1] : b,
  }
  return sortAlpha(sort.a, sort.b)
}

export const sortNumeric = (
  a: number,
  b: number,
) => {
  if (a !== b) {
    if (a < b) {
      return -1
    }
    return 1
  }
  return 0
}
