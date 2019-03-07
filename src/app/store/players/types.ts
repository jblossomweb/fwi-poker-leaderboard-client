import Immutable from 'immutable'
import { Primitive, PrimitiveInterface } from 'core/store/state.types'

import { Country } from 'app/data/countries.types'

export interface Player extends PrimitiveInterface {
  id: string,
  name: string,
  winnings: number,
  country: Country['code'],
  email?: string,
  facebookId?: string,
  googleId?: string,
  twitterHandle?: string,
}

export type Players = Player[]

export interface PlayerEdits {
  [id: string]: Partial<Player>
}

export type ImmutablePlayer = Immutable.Map<string, Primitive>
export type ImmutablePlayers = Immutable.Map<Player['id'], ImmutablePlayer>
