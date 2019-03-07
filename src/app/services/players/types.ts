import { RestInterface } from 'core/services/rest.types'

export interface PlayersRestInterface extends Partial<RestInterface> {
  get: RestInterface['get'],
  post: RestInterface['post'],
  put: RestInterface['put'],
  delete: RestInterface['delete'],
}

export interface PlayersServiceInterface {
  getPlayers: () => Promise<any>,
  // getPlayer: (id: string) => Promise<any>,
  createPlayer: (player: any) => Promise<any>,
  updatePlayer: (id: string, update: any) => Promise<any>,
  deletePlayer: (id: string) => Promise<any>,
}
