import { defaultRest, promisePost } from 'core/services/rest.utils'

import { SampleRestInterface, SampleServiceInterface } from './sample.service.types'
import { queryAllCountries, queryCountryByCode } from './sample.service.queries'

const API_URL: string = 'https://countries.trevorblades.com'

const countryRest: SampleRestInterface = {
  post: defaultRest.post,
}

export class SampleService implements SampleServiceInterface {
  apiUrl: string
  rest: SampleRestInterface
  constructor(
    apiUrl: string,
    rest: SampleRestInterface,
  )  {
    this.apiUrl = apiUrl
    this.rest = rest
  }

  getAllSampleCountries() {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/`
    const url = `${this.apiUrl}${endpoint}`
    const body = {
      query: queryAllCountries,
    }
    return promisePost({ url, body, headers }, this.rest)
    .then(response => response.data.countries)
  }

  getSampleCountryByCode(code: string) {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/`
    const url = `${this.apiUrl}${endpoint}`
    const body = {
      query: queryCountryByCode,
      variables: {
        code,
      },
    }
    return promisePost({ url, body, headers }, this.rest)
    .then(response => response.data.country)
  }

}

export default new SampleService(API_URL, countryRest)
