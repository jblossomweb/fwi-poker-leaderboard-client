import React from 'react'
import { message } from 'antd'
import { Primitive } from 'core/store/state.types'
import { Player, Players, PlayerEdits } from 'app/store/players/types'
import PlayerWinningsTable from 'app/components/PlayerWinningsTable'

export interface StateProps {
  fetchingPlayers: boolean,
  fetchPlayersError: Error | null,
  players?: Players,
  playerEdits: PlayerEdits,
  editingPlayerId: Player['id'] | null,
  savingEditedPlayer: boolean,
  saveEditedPlayerError: Error | null,
  addingPlayer: boolean,
  savingAddedPlayer: boolean,
  saveAddedPlayerError: Error | null,
  deletingPlayer: Player['id'] | null,
  deletePlayerError: Error | null,
}

export interface DispatchProps {
  fetchPlayers: () => void,
  addPlayer: () => void,
  cancelAddPlayer: () => void,
  editPlayer: (id: Player['id']) => void,
  cancelEditPlayer: (id: Player['id']) => void,
  editPlayerField: (id: Player['id'], field: string, value: Primitive) => void,
  saveEditedPlayer: (id: Player['id'], update: Partial<Player>) => void,
  saveAddedPlayer: (player: Partial<Player>) => void,
  deletePlayer: (id: Player['id']) => void,
}

export type Props = StateProps & DispatchProps

class PlayerWinningsPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    message.config({ maxCount: 1 })
    this.messageError = this.messageError.bind(this)
    this.messageDestroy = this.messageDestroy.bind(this)
  }

  messageError(error: string) {
    message.error(error)
  }

  messageDestroy() {
    message.destroy()
  }

  componentDidMount() {
    const { players, fetchPlayers } = this.props
    if (!players) {
      fetchPlayers()
    }
  }

  componentDidUpdate() {
    const {
      fetchPlayersError,
      saveEditedPlayerError,
      saveAddedPlayerError,
      deletePlayerError,
    } = this.props

    if (fetchPlayersError) {
      this.messageError(`could not fetch players: ${fetchPlayersError.message}`)
    } else if (saveEditedPlayerError) {
      this.messageError(`could not save player: ${saveEditedPlayerError.message}`)
    } else if (saveAddedPlayerError) {
      this.messageError(`could not save player: ${saveAddedPlayerError.message}`)
    } else if (deletePlayerError) {
      this.messageError(`could not delete player: ${deletePlayerError.message}`)
    } else {
      this.messageDestroy()
    }
  }

  render() {
    const { props } = this
    return (
      <div>
        <PlayerWinningsTable
          fetchingPlayers={props.fetchingPlayers}
          fetchPlayersError={props.fetchPlayersError}
          players={props.players || []}
          playerEdits={props.playerEdits}
          editing={props.editingPlayerId}
          adding={props.addingPlayer}
          addPlayer={props.addPlayer}
          cancelAddPlayer={props.cancelAddPlayer}
          saveAddedPlayer={props.saveAddedPlayer}
          savingAddedPlayer={props.savingAddedPlayer}
          saveAddedPlayerError={props.saveAddedPlayerError}
          editPlayer={props.editPlayer}
          editPlayerField={props.editPlayerField}
          cancelEditPlayer={props.cancelEditPlayer}
          saveEditedPlayer={props.saveEditedPlayer}
          savingEditedPlayer={props.savingEditedPlayer}
          saveEditedPlayerError={props.saveEditedPlayerError}
          deletePlayer={props.deletePlayer}
          deletingPlayer={props.deletingPlayer}
          deletePlayerError={props.deletePlayerError}
        />
      </div>
    )
  }
}

export default PlayerWinningsPage
