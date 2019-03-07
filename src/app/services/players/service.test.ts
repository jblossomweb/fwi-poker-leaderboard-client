import { PlayersService } from './service'

import {
  mockUrl,
  mockRest,
} from './service.test.mocks'

const spies = {
  get: jest.spyOn(mockRest, 'get'),
  post: jest.spyOn(mockRest, 'post'),
  put: jest.spyOn(mockRest, 'put'),
  delete: jest.spyOn(mockRest, 'delete'),
}

const mockService = new PlayersService(mockUrl, mockRest)

describe('services/players', () => {

  describe('getPlayers', () => {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players`
    beforeEach(async () => {
      await mockService.getPlayers()
    })
    it(`makes a GET request`, () => {
      expect(spies.get).toHaveBeenCalled()
    })
    it(`makes a GET request to ${endpoint} with proper headers`, () => {
      expect(spies.get).toHaveBeenLastCalledWith(
        `${mockUrl}${endpoint}`,
        { headers },
      )
    })
  })

  describe('updatePlayer', () => {
    const id = '5c7453b9a8487142b8230669'
    const update = {
      name: 'Updated Name',
    }
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players/${id}`
    beforeEach(async () => {
      await mockService.updatePlayer(id, update)
    })
    it(`makes a PUT request`, () => {
      expect(spies.put).toHaveBeenCalled()
    })
    it(`makes a PUT request to ${endpoint} with proper body and headers`, () => {
      expect(spies.put).toHaveBeenLastCalledWith(
        `${mockUrl}${endpoint}`,
        update,
        { headers },
      )
    })
  })

  describe('createPlayer', () => {
    const player = {
      name: 'Updated Name',
      country: 'US',
      winnings: 100,
    }
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players`
    beforeEach(async () => {
      await mockService.createPlayer(player)
    })
    it(`makes a POST request`, () => {
      expect(spies.post).toHaveBeenCalled()
    })
    it(`makes a POST request to ${endpoint} with proper body and headers`, () => {
      expect(spies.post).toHaveBeenLastCalledWith(
        `${mockUrl}${endpoint}`,
        player,
        { headers },
      )
    })
  })

  describe('deletePlayer', () => {
    const id = '5c7453b9a8487142b8230669'
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = `/players/${id}`
    beforeEach(async () => {
      await mockService.deletePlayer(id)
    })
    it(`makes a DELETE request`, () => {
      expect(spies.delete).toHaveBeenCalled()
    })
    it(`makes a DELETE request to ${endpoint} with proper body and headers`, () => {
      expect(spies.delete).toHaveBeenLastCalledWith(
        `${mockUrl}${endpoint}`,
        { headers },
      )
    })
  })
})
