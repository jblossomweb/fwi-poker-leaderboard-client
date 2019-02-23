import { SampleService } from './sample.service'

import {
  mockUrl,
  mockRest,
} from './sample.service.test.mocks'

import { 
  queryAllCountries,
  queryCountryByCode,
} from './sample.service.queries'

const spies = {
  post: jest.spyOn(mockRest, 'post'),
}

const mockService = new SampleService(mockUrl, mockRest)

describe('services/sample.service', () => {

  describe('getAllSampleCountries', () => {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/`
    const body = {
      query: queryAllCountries,
    }
    beforeEach(async () => {
      await mockService.getAllSampleCountries()
    })
    it(`makes a POST request`, () => {
      expect(spies.post).toHaveBeenCalled()
    })
    it(`makes a POST request to ${endpoint} with proper body and headers`, () => {
      expect(spies.post).toHaveBeenLastCalledWith(
        `${mockUrl}${endpoint}`,
        body,
        { headers },
      )
    })
  })

  describe('getSampleCountryByCode', () => {
    const code = 'US'
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/`
    const body = {
      query: queryCountryByCode,
      variables: {
        code,
      },
    }
    beforeEach(async () => {
      await mockService.getSampleCountryByCode(code)
    })
    it(`makes a POST request`, () => {
      expect(spies.post).toHaveBeenCalled()
    })
    it(`makes a POST request to ${endpoint} with proper body and headers`, () => {
      expect(spies.post).toHaveBeenLastCalledWith(
        `${mockUrl}${endpoint}`,
        body,
        { headers },
      )
    })
  })
})
