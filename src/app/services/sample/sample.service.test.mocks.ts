import { PostInterface } from 'core/services/rest.types'

import { SampleRestInterface } from './sample.service.types'

export const mockUrl: string = 'https://api.nowhere.noplace'

export const mockResponse = {
  data: {
    countries: [],
    country: {},
  },
}

export const mockErrorResponse: Error = {
  name: 'Error',
  message: 'Mock Error Response.',
}

export const mockRest: SampleRestInterface = {
  post: (
    _url: PostInterface['url'],
    _data: PostInterface['data'],
  ): Promise<any> => Promise.resolve({
    data: mockResponse,
  })
}

export const mockRestError: SampleRestInterface = {
  post: (
    _url: PostInterface['url'],
    _data: PostInterface['data'],
  ): Promise<any> => Promise.reject(mockErrorResponse)
}
