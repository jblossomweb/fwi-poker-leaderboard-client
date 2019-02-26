import {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios'

export interface RestInterface {
  get: AxiosInstance['get'],
  post: AxiosInstance['post'],
  put: AxiosInstance['put'],
  patch: AxiosInstance['patch'],
  delete: AxiosInstance['delete'],
}

export interface GetInterface {
  url: string,
  config?: AxiosRequestConfig,
}

export interface PostInterface {
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
}

export interface PutInterface {
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
}

export interface DeleteInterface {
  url: string,
  config?: AxiosRequestConfig,
}

export interface GetRequest {
  url: string,
  headers?: {
    [key: string]: string,
  },
}

export interface PostRequest {
  url: string,
  body: any,
  headers?: {
    [key: string]: string,
  },
}

export interface PutRequest {
  url: string,
  body: any,
  headers?: {
    [key: string]: string,
  },
}

export interface DeleteRequest {
  url: string,
  headers?: {
    [key: string]: string,
  },
}
