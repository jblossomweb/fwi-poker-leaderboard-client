import { Player, PlayerEdits } from './types'

export const error: Error = {
  name: 'Sample Error',
  message: 'sample error message.'
}

export const id: Player['id'] = '5c7453b9a8487142b8230669'

export const barney: Player = {
  id,
  name: 'Barney Rubble',
  country: 'US',
  winnings: 3000,
  twitterHandle: 'BarneyRubbl',
}

export const fred: Player = {
  id: '5c7453b9a8487142b8230668',
  name: 'Fred Flintstone',
  country: 'US',
  winnings: 2000,
  twitterHandle: 'FredFlintstone_',
}

export const ralph: Player = {
  id: '5c7453b9a8487142b8230667',
  name: 'Wreck-It Ralph',
  country: 'US',
  winnings: 1000,
  twitterHandle: 'wreckitralph',
}

export const four: Player = {
  id: '5c7453b9a8487142b8230666',
  name: 'Player Four',
  country: 'CA',
  winnings: 100,
}

export const five: Player = {
  id: '5c7453b9a8487142b8230665',
  name: 'Player Five',
  country: 'MX',
  winnings: 100,
}

export const players: Player[] = [
  barney,
  fred,
  ralph,
  four,
  five,
]

export const edits: PlayerEdits = {
  [id]: { name: 'Barney Trubble' }
}
