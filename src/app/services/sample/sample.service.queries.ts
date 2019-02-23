export const queryAllCountries = `
{
  countries {
    code
    name
    emoji
  }
}
`

export const queryCountryByCode = `
query(
  $code: String!
) {
  country(code: $code) {
    name
    native
    code
    emoji
    currency
    phone
    continent {
      name
    }
    languages {
      name
      native
      code
    }
  }
}
`
