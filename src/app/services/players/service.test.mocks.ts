import { PostInterface } from 'core/services/rest.types'
import { PlayersRestInterface } from './types'

export const mockUrl: string = 'https://api.nowhere.noplace'

export const mockResponses = {
  array: [],
  object: {},
}

export const mockErrorResponse: Error = {
  name: 'Error',
  message: 'Mock Error Response.',
}

export const mockRest: PlayersRestInterface = {
  get: (
    _url: PostInterface['url'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses.array,
  }),
  post: (
    _url: PostInterface['url'],
    _data: PostInterface['data'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses.object,
  }),
  put: (
    _url: PostInterface['url'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses.object,
  }),
  delete: (
    _url: PostInterface['url'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses.object,
  }),
}

const reject = (..._args: any[]): Promise<any> =>
  Promise.reject(mockErrorResponse)

export const mockRestError: PlayersRestInterface = {
  get: reject,
  post: reject,
  put: reject,
  delete: reject,
}
