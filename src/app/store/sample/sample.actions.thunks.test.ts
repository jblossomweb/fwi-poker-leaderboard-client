import windowOrGlobal from 'window-or-global'
import { mockDispatch } from 'core/store/dispatch.mock.utils'
import { SampleService } from 'app/services/sample/sample.service'
import { SampleServiceInterface } from 'app/services/sample/sample.service.types'
import {
  mockUrl,
  mockRest,
  mockResponse,
  mockRestError,
  mockErrorResponse,
} from 'app/services/sample/sample.service.test.mocks'

import {
  fetchSampleCountriesSuccess,
  fetchSampleCountriesError,
  fetchSampleCountrySuccess,
  fetchSampleCountryError,
} from './sample.actions'

import {
  fetchSampleCountriesThunk,
  fetchSampleCountryThunk,
} from './sample.actions.thunks'

const mockService = new SampleService(mockUrl, mockRest)
const mockServiceError = new SampleService(mockUrl, mockRestError)

windowOrGlobal.console = {
  error: jest.fn(),
}

const getSpies = (
  service: SampleServiceInterface,
) => ({
  getAllSampleCountries: jest.spyOn(service, 'getAllSampleCountries'),
  getSampleCountryByCode: jest.spyOn(service, 'getSampleCountryByCode'),
})

const spies = {
  success: getSpies(mockService),
  fail: getSpies(mockServiceError),
}

describe('store/sample/sample.actions.thunks', () => {

  describe('fetchSampleCountriesThunk', () => {
    const success: Promise<any> = fetchSampleCountriesThunk(mockService)(mockDispatch)
    const fail: Promise<any> = fetchSampleCountriesThunk(mockServiceError)(mockDispatch)

    it(`always calls service.getAllSampleCountries`, async() => {
      await success
      expect(spies.success.getAllSampleCountries).toHaveBeenCalled()
      await fail
      expect(spies.fail.getAllSampleCountries).toHaveBeenCalled()
    })

    it(`dispatches fetchSampleCountriesSuccess action upon success`, async() => {
      const dispatchedAction = await success
      expect(dispatchedAction).toEqual(
        mockDispatch(fetchSampleCountriesSuccess(mockResponse.data.countries))
      )
    })

    it(`dispatches fetchSampleCountriesError action upon fail`, async() => {
      const dispatchedAction = await fail
      expect(dispatchedAction).toEqual(
        mockDispatch(fetchSampleCountriesError(mockErrorResponse))
      )
    })
  })

  describe('fetchSampleCountryThunk', () => {
    const code: string = 'US'
    const success: Promise<any> = fetchSampleCountryThunk(code, mockService)(mockDispatch)
    const fail: Promise<any> = fetchSampleCountryThunk(code, mockServiceError)(mockDispatch)

    it(`always calls service.getSampleCountryByCode`, async() => {
      await success
      expect(spies.success.getSampleCountryByCode).toHaveBeenCalled()
      await fail
      expect(spies.fail.getSampleCountryByCode).toHaveBeenCalled()
    })

    it(`dispatches fetchSampleCountrySuccess action upon success`, async() => {
      const dispatchedAction = await success
      expect(dispatchedAction).toEqual(
        mockDispatch(fetchSampleCountrySuccess(mockResponse.data.country))
      )
    })

    it(`dispatches fetchSampleCountryError action upon fail`, async() => {
      const dispatchedAction = await fail
      expect(dispatchedAction).toEqual(
        mockDispatch(fetchSampleCountryError(mockErrorResponse))
      )
    })
  })
})
