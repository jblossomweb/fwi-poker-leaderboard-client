import { Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { AppState, Primitive } from 'core/store/state.types'

import { PlayersServiceInterface } from 'app/services/players/types'
import LivePlayersService from 'app/services/players/service'

import { Player } from 'app/store/players/types'
import playerSelectors from 'app/store/players/selectors'
import playerActions from 'app/store/players/action.creators'

import PlayerWinningsPage, {
  DispatchProps,
} from './PlayerWinningsPage'

export const mapStateToProps = (
  state: AppState,
) => ({
  fetchingPlayers: playerSelectors.getFetchingPlayers(state),
  fetchPlayersError: playerSelectors.getFetchPlayersError(state),
  players: playerSelectors.getPlayers(state),
  playerEdits: playerSelectors.getPlayerEdits(state),
  editingPlayerId: playerSelectors.getEditingPlayerId(state),
  savingEditedPlayer: playerSelectors.getSavingEditedPlayer(state),
  saveEditedPlayerError: playerSelectors.getSaveEditedPlayerError(state),
  addingPlayer: playerSelectors.getAddingPlayer(state),
  savingAddedPlayer: playerSelectors.getSavingAddedPlayer(state),
  saveAddedPlayerError: playerSelectors.getSaveAddedPlayerError(state),
  deletingPlayer: playerSelectors.getDeletingPlayer(state),
  deletePlayerError: playerSelectors.getDeletePlayerError(state),
})

export const mapDispatchToProps = (
  playersService: PlayersServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  fetchPlayers: () => dispatch(
    playerActions.fetchPlayers(playersService)(dispatch)
  ),
  editPlayer: (
    id: Player['id'],
  ) => dispatch(
    playerActions.editPlayer(id)
  ),
  editPlayerField: (
    id: Player['id'],
    field: string,
    value: Primitive,
  ) => dispatch(
    playerActions.editPlayerField(id, field, value)
  ),
  cancelEditPlayer: (
    id: Player['id'],
  ) => dispatch(
    playerActions.cancelEditPlayer(id)
  ),
  saveEditedPlayer: (
    id: Player['id'],
    update: Partial<Player>,
  ) => dispatch(
    playerActions.saveEditedPlayer(id, update, playersService)(dispatch)
  ),
  addPlayer: () => dispatch(
    playerActions.addPlayer()
  ),
  cancelAddPlayer: () => dispatch(
    playerActions.cancelAddPlayer()
  ),
  saveAddedPlayer: (
    player: Partial<Player>,
  ) => dispatch(
    playerActions.saveAddedPlayer(player, playersService)(dispatch)
  ),
  deletePlayer: (
    id: Player['id'],
  ) => dispatch(
    playerActions.deletePlayer(id, playersService)(dispatch)
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps(LivePlayersService),
)(withImmutablePropsToJS(PlayerWinningsPage))
