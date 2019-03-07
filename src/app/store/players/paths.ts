import { Path, Paths } from 'core/store/paths.types'

const paths: Paths = {
  players: () => [
    'poker',
    'players',
  ] as Path,

  player: (id) => [
    'poker',
    'players',
    id,
  ] as Path,

  playerEdits: () => [
    'poker',
    'playerEdits',
  ] as Path,

  playerEdit: (id) => [
    'poker',
    'playerEdits',
    id,
  ] as Path,

  playerEditField: (id, field) => [
    'poker',
    'playerEdits',
    id,
    field,
  ] as Path,

  editingPlayerId: () => [
    'poker',
    'editingPlayerId',
  ] as Path,

  fetchingPlayers: () => [
    'poker',
    'fetchingPlayers',
  ] as Path,

  fetchPlayersError: () => [
    'poker',
    'fetchPlayersError',
  ] as Path,

  savingEditedPlayer: () => [
    'poker',
    'savingEditedPlayer',
  ] as Path,

  saveEditedPlayerError: () => [
    'poker',
    'saveEditedPlayerError',
  ] as Path,

  addingPlayer: () => [
    'poker',
    'addingPlayer',
  ] as Path,

  savingAddedPlayer: () => [
    'poker',
    'savingAddedPlayer',
  ] as Path,

  saveAddedPlayerError: () => [
    'poker',
    'saveAddedPlayerError',
  ] as Path,

  deletingPlayer: () => [
    'poker',
    'deletingPlayer',
  ] as Path,

  deletePlayerError: () => [
    'poker',
    'deletePlayerError',
  ] as Path,
}

export default paths
