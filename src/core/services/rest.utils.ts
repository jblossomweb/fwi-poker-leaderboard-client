import axios, { AxiosResponse } from 'axios'
import windowOrGlobal from 'window-or-global'

import { RestInterface, GetRequest, PostRequest } from './rest.types'

export const promiseGet = (
  request: GetRequest,
  rest: {
    get: RestInterface['get'],
  },
) => rest.get(request.url, { headers: request.headers })
.then((response: AxiosResponse) => response.data)
.catch((err: Error) => {
  windowOrGlobal.console.error(`API ERROR: could not GET ${request.url}: ${err.message}\n\n${err.stack}`)
  return Promise.reject(err)
})

export const promisePost = (
  request: PostRequest,
  rest: {
    post: RestInterface['post'],
  },
) => rest.post(request.url, request.body, { headers: request.headers })
.then((response: AxiosResponse) => response.data)
.catch((err: Error) => {
  windowOrGlobal.console.error(`API ERROR: could not POST to ${request.url}: ${err.message}\n\n${err.stack}`)
  return Promise.reject(err)
})

export const defaultRest = axios
