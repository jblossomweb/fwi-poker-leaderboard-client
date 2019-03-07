import {
  defaultRest,
  promisePost,
  promiseGet,
  promisePut,
  promiseDelete,
} from 'core/services/rest.utils'

// import { delay } from 'core/test/mock.utils'
import appConfig from 'app/config'
const liveUrl: string = appConfig.playerServiceUrl

import {
  PlayersRestInterface,
  PlayersServiceInterface,
} from './types'

const liveRest: PlayersRestInterface = {
  get: defaultRest.get,
  post: defaultRest.post,
  put: defaultRest.put,
  delete: defaultRest.delete,
}

export class PlayersService implements PlayersServiceInterface {
  apiUrl: string
  rest: PlayersRestInterface

  constructor(apiUrl: string, rest: PlayersRestInterface)  {
    this.apiUrl = apiUrl
    this.rest = rest
  }

  getPlayers() {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players`
    const url = `${this.apiUrl}${endpoint}`
    return promiseGet({ url, headers }, this.rest)
      .then(response => response)
      // .then(delay(2000)) // useful debug
  }

  updatePlayer(
    id: string,
    update: any,
  ) {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players/${id}`
    const url = `${this.apiUrl}${endpoint}`
    const body = update
    return promisePut({ url, body, headers }, this.rest)
      .then(response => response)
      // .then(delay(2000)) // useful debug
  }

  createPlayer(
    player: any,
  ) {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players`
    const url = `${this.apiUrl}${endpoint}`
    const body = player
    return promisePost({ url, body, headers }, this.rest)
      .then(response => response)
      // .then(delay(2000)) // useful debug
  }

  deletePlayer(
    id: string,
  ) {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players/${id}`
    const url = `${this.apiUrl}${endpoint}`
    return promiseDelete({ url, headers }, this.rest)
      .then(response => response)
      // .then(delay(2000)) // useful debug
  }

}

export default new PlayersService(liveUrl, liveRest)
