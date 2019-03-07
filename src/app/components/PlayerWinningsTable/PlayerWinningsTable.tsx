import React from 'react'

import debounce from 'lodash/debounce'
import isNumber from 'lodash/isNumber'
import keys from 'lodash/keys'

import {
  Icon, Table, Button, InputNumber, Spin, Tooltip,
} from 'antd'

import sortUtils from 'core/tables/sort.utils'
import { formatBigNumber } from 'core/tables/display.utils'

import { Primitive } from 'core/store/state.types'
import { Player, PlayerEdits } from 'app/store/players/types'

import AddPlayerForm from 'app/components/AddPlayerForm'
import NameEdit from 'app/components/NameEdit'
import { WrappedCountrySelect } from 'app/components/CountrySelect'
import CountryDisplay from 'app/components/CountryDisplay'
import AvatarSelect from 'app/components/AvatarSelect'
import AvatarDisplay from 'app/components/AvatarDisplay'
import CancelSaveButtons from 'app/components/CancelSaveButtons'
import EditDeleteButtons from 'app/components/EditDeleteButtons'

import styles from './PlayerWinningsTable.module.css'

export interface Props {
  fetchingPlayers: boolean,
  fetchPlayersError: Error | null,
  players: Player[],
  playerEdits: PlayerEdits,
  editing: Player['id'] | null,
  adding: boolean,
  addPlayer: () => void,
  cancelAddPlayer: () => void,
  editPlayer: (id: Player['id']) => void,
  cancelEditPlayer: (id: Player['id']) => void,
  editPlayerField: (id: Player['id'], field: string, value: Primitive) => void,
  saveEditedPlayer: (id: Player['id'], update: Partial<Player>) => void,
  savingEditedPlayer: boolean,
  saveEditedPlayerError: Error | null,
  saveAddedPlayer: (player: Partial<Player>) => void,
  savingAddedPlayer: boolean,
  saveAddedPlayerError: Error | null,
  deletePlayer: (id: Player['id']) => void,
  deletingPlayer: Player['id'] | null,
  deletePlayerError: Error | null,
}

class PlayerWinningsTable extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
    this.editField = this.editField.bind(this)
    this.sortPlayersByName = this.sortPlayersByName.bind(this)
    this.sortPlayersByWinnings = this.sortPlayersByWinnings.bind(this)
    this.sortPlayersByCountry = this.sortPlayersByCountry.bind(this)
  }

  editField(id: Player['id'], field: string, value: Primitive) {
    debounce(this.props.editPlayerField, 300)(id, field, value)
  }

  sortPlayersByName(a: Player, b: Player) {
    return sortUtils.sortBySurname(a.name, b.name)
  }

  sortPlayersByWinnings(a: Player, b: Player) {
    return sortUtils.sortNumeric(a.winnings, b.winnings)
  }

  sortPlayersByCountry(a: Player, b: Player) {
    return sortUtils.sortAlpha(a.country, b.country)
  }

  render() {
    const {
      props,
      editField,
      sortPlayersByName,
      sortPlayersByWinnings,
      sortPlayersByCountry,
    } = this

    return (
      <div className={styles.wrapper}>
        <h2>
          <span className={styles.title}>
            <span>
              <Icon
                className={styles.titleIcon}
                type={`dollar`}
                theme={`twoTone`}
              />
              <span>All-Time Tournament Earnings</span>
            </span>
            {props.adding ? (
              <Button
                data-tag={`buttonCancelAdd`}
                className={styles.add}
                type={`danger`}
                size={`small`}
                icon={`close-circle`}
                onClick={() => props.cancelAddPlayer()}
                disabled={props.savingAddedPlayer}
              >
                Cancel
              </Button>
            ) : (
              <Button
                data-tag={`buttonAddPlayer`}
                className={styles.add}
                type={`primary`}
                size={`small`}
                icon={`plus-circle`}
                onClick={() => props.addPlayer()}
                disabled={props.savingAddedPlayer || props.fetchingPlayers}
              >
                Add Player
              </Button>
            )}
          </span>
        </h2>
        <div
          data-tag={`panelAddPlayerForm`}
          className={`${styles.panel} ${props.adding ? styles.panelOpen : styles.panelClosed}`}
        >
          <AddPlayerForm
            saveAddedPlayer={props.saveAddedPlayer}
            savingAddedPlayer={props.savingAddedPlayer}
            saveAddedPlayerError={props.saveAddedPlayerError}
          />
        </div>
        <Spin data-tag={`spinTable`} spinning={props.fetchingPlayers} tip="Fetching Players...">
          <Table
            className={styles.table}
            size={`middle`}
            dataSource={props.players}
            rowKey={`id`}
            columns={[
              {
                key: 'avatar',
                align: 'center',
                width: 80,
                render: (
                  _text: any,
                  player: Player,
                ) => props.editing === player.id ? (
                  <AvatarSelect
                    player={player}
                    disabled={(
                      props.deletingPlayer === player.id ||
                      props.savingEditedPlayer
                    )}
                    playerEdits={props.playerEdits}
                    editField={editField}
                    saveEditedPlayer={props.saveEditedPlayer}
                    cancelEditPlayer={props.cancelEditPlayer}
                  />
                ) : (
                  <AvatarDisplay player={player} />
                  
                )
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: sortPlayersByName,
                sortDirections: ['ascend', 'descend'],
                align: 'left',
                render: (
                  name: string,
                  player: Player,
                ) => props.editing === player.id ? (
                  <NameEdit
                    player={player}
                    playerEdits={props.playerEdits}
                    savingEditedPlayer={props.savingEditedPlayer}
                    editField={editField}
                  />
                ) : (
                  <div className={props.deletingPlayer === player.id ? styles.grayOut : ''}>
                    {name}
                  </div>
                ),
              },
              {
                title: 'Native Of',
                dataIndex: 'country',
                key: 'country',
                sorter: sortPlayersByCountry,
                sortDirections: ['ascend', 'descend'],
                align: 'center',
                className: styles.country,
                render: (
                  countryCode: string,
                  player: Player,
                ) => props.editing === player.id ? (
                  <Tooltip title={`select country`}>
                    <WrappedCountrySelect
                      size={`small`}
                      defaultValue={
                        (
                          props.playerEdits[player.id] &&
                          props.playerEdits[player.id].country
                         ) ||
                         countryCode
                      }
                      disabled={props.savingEditedPlayer}
                      onChange={(value: string) => value && editField(
                        player.id,
                        'country',
                        value,
                      )}
                    />
                  </Tooltip>
                ) : (
                  <div className={props.deletingPlayer === player.id ? styles.grayOut : ''}>
                    <CountryDisplay code={countryCode} />
                  </div>
                ),
              },
              {
                title: 'Winnings',
                dataIndex: 'winnings',
                key: 'winnings',
                sorter: sortPlayersByWinnings,
                sortDirections: ['ascend', 'descend'],
                defaultSortOrder: 'descend',
                align: 'right',
                className: styles.winnings,
                render: (
                  winnings: number,
                  player: Player,
                ) => props.editing === player.id ? (
                  <Tooltip title={`enter total winnings in USD`}>
                    <InputNumber
                      size={`small`}
                      min={0}
                      defaultValue={
                        (
                          props.playerEdits[player.id] &&
                          props.playerEdits[player.id].winnings
                         ) ||
                         winnings
                      }
                      disabled={props.savingEditedPlayer}
                      formatter={value => `$${Number(value).toLocaleString()}`}
                      onChange={value => isNumber(value) && editField(
                        player.id,
                        'winnings',
                        value,
                      )}
                    />
                  </Tooltip>
                ) : (
                  <div className={props.deletingPlayer === player.id ? styles.grayOut : ''}>
                    <Tooltip title={`$${winnings.toLocaleString()}`}>
                      ${winnings > 1000 ? formatBigNumber(winnings, 1) : winnings}
                    </Tooltip>
                  </div>
                ),
              },
              {
                title: 'Actions',
                key: 'actions',
                align: 'right',
                className: styles.actions,
                render: (
                  _text: any,
                  player: Player,
                ) => props.editing === player.id ? (
                  <CancelSaveButtons
                    disabled={props.savingEditedPlayer}
                    onCancel={() => props.cancelEditPlayer(player.id)}
                    onSave={() => {
                      const unsavedChanges = props.playerEdits[player.id]
                      if (unsavedChanges && keys(unsavedChanges).length) {
                        props.saveEditedPlayer(player.id, unsavedChanges)
                      } else {
                        props.cancelEditPlayer(player.id)
                      }
                    }}
                  />
                ) : (
                  <EditDeleteButtons
                    disabled={props.deletingPlayer === player.id}
                    onEdit={() => props.editPlayer(player.id)}
                    onDelete={() => props.deletePlayer(player.id)}
                    deleteConfirm={`delete this player?`}
                  />
                ),
              },
              {
                title: '',
                key: 'loading',
                align: 'left',
                className: styles.loading,
                render: (
                  _text: any,
                  player: Player,
                ) => (
                  <Spin 
                    spinning={
                      (props.editing === player.id && props.savingEditedPlayer) ||
                      (props.deletingPlayer === player.id)
                    }
                  />
                )
              }
            ]}
          />
        </Spin>
      </div>
    )
  }
}

export default PlayerWinningsTable
