import React from 'react'
import { mount } from 'enzyme'

import forEach from 'lodash/forEach'
import find from 'lodash/find'
import keys from 'lodash/keys'

import { Spin, Table, Button, InputNumber } from 'antd'
import { TableProps, ColumnProps } from 'antd/lib/table'

import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import sortUtils from 'core/tables/sort.utils'
import { Player } from 'app/store/players/types'
import { players } from 'app/store/players/mocks'

import NameEdit from 'app/components/NameEdit'
import CountryDisplay from 'app/components/CountryDisplay'
import { WrappedCountrySelect } from 'app/components/CountrySelect'
import AvatarSelect from 'app/components/AvatarSelect'
import AvatarDisplay from 'app/components/AvatarDisplay'
import AddPlayerForm from 'app/components/AddPlayerForm'
import CancelSaveButtons from 'app/components/CancelSaveButtons'
import EditDeleteButtons from 'app/components/EditDeleteButtons'

import { scenarios, mockProps } from './PlayerWinningsTable.test.story'
import PlayerWinningsTable  from './PlayerWinningsTable'
import styles from './PlayerWinningsTable.module.css'

const spies = {
  editField: jest.spyOn(PlayerWinningsTable.prototype, 'editField'),
  editPlayer: jest.spyOn(mockProps, 'editPlayer'),
  deletePlayer: jest.spyOn(mockProps, 'deletePlayer'),
  cancelEditPlayer: jest.spyOn(mockProps, 'cancelEditPlayer'),
  saveEditedPlayer: jest.spyOn(mockProps, 'saveEditedPlayer'),
  sortBySurname: jest.spyOn(sortUtils, 'sortBySurname'),
  sortNumeric: jest.spyOn(sortUtils, 'sortNumeric'),
  sortAlpha: jest.spyOn(sortUtils, 'sortAlpha'),
}

const mountedScenarios = mountScenarios(scenarios)

const scenes = getTestScenes(
  mountedScenarios,
  PlayerWinningsTable,
  component => ({
    Table: component.find(Table),
    TableHeader: component.find('TableHeader'),
    th: component.find('th'),
    Spin: component.find(Spin),
    spinTable: component.find('Spin[data-tag="spinTable"]'),
    panelAddPlayerForm: component.find('div[data-tag="panelAddPlayerForm"]'),
    AddPlayerForm: component.find(AddPlayerForm),
    Button: component.find(Button),
    buttonCancelAdd: component.find('Button[data-tag="buttonCancelAdd"]'),
    buttonAddPlayer: component.find('Button[data-tag="buttonAddPlayer"]'),
  })
)

// in expected order
const expectedColumns: ColumnProps<any>['key'][] = [
  'avatar',
  'name',
  'country',
  'winnings',
  'actions',
  'loading',
]

const findColumn = (scene: any, columnKey: ColumnProps<any>['key']) => {
  const tableProps: TableProps<any> = scene.elements.Table.props()
  const found: ColumnProps<any> | undefined = find(tableProps.columns, { key: columnKey })
  return found
}

const mountColumn = (scene: any, mockPlayer: Player, columnKey: ColumnProps<any>['key']) => {
  const found: ColumnProps<any> | undefined = findColumn(scene, columnKey)
  const renderColumn: ColumnProps<any>['render'] = found!.render!
  const mounted = mount(
    <React.Fragment>
      {renderColumn('', mockPlayer, 0)}
    </React.Fragment>
  )
return mounted
}

describe('components/PlayerWinningsTable', () => {
  it(`always mounts the PlayerWinningsTable component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })

  it(`always mounts a Spin component called spinTable`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.spinTable.length).toBe(1)
    })
  })

  it(`spins spinTable when fetchingPlayers is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.fetchingPlayers) {
        expect(scene.elements.spinTable.props().spinning).toBe(true)
      }
    })
  })

  it(`does not spin spinTable when fetchingPlayers is false`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        expect(scene.elements.spinTable.props().spinning).toBe(false)
      }
    })
  })

  it(`always mounts an AddPlayerForm component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.AddPlayerForm.length).toBe(1)
    })
  })

  it(`always mounts a closeable panel for AddPlayerForm component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.panelAddPlayerForm.length).toBe(1)
    })
  })

  it(`opens closeable panel for AddPlayerForm component when props.adding is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.adding) {
        const panelProps = scene.elements.panelAddPlayerForm.props()
        expect(panelProps.className).toEqual(`${styles.panel} ${styles.panelOpen}`)
      }
    })
  })

  it(`mounts a buttonCancelAdd Button component when props.adding is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.adding) {
        expect(scene.elements.buttonCancelAdd.length).toBe(1)
      }
    })
  })

  it(`calls props.cancelAddPlayer when buttonCancelAdd is clicked`, () => {
    let called: boolean = false
    const scene = mount(
      <PlayerWinningsTable
        {...mockProps}
        adding={true}
        cancelAddPlayer={() => {
          called = true
        }}
      />
    )
    const button = scene.find('Button[data-tag="buttonCancelAdd"]')
    expect(called).toBe(false)
    button.simulate('click')
    expect(called).toBe(true)
  })

  it(`closes closeable panel for AddPlayerForm component when props.adding is false`, () => {
    forEach(scenes, scene => {
      if (!scene.props.adding) {
        const panelProps = scene.elements.panelAddPlayerForm.props()
        expect(panelProps.className).toEqual(`${styles.panel} ${styles.panelClosed}`)
      }
    })
  })

  it(`mounts a buttonAddPlayer Button component when props.adding is false`, () => {
    forEach(scenes, scene => {
      if (!scene.props.adding) {
        expect(scene.elements.buttonAddPlayer.length).toBe(1)
      }
    })
  })

  it(`calls props.addPlayer when buttonAddPlayer is clicked`, () => {
    let called: boolean = false
    const scene = mount(
      <PlayerWinningsTable
        {...mockProps}
        adding={false}
        addPlayer={() => {
          called = true
        }}
      />
    )
    const button = scene.find('Button[data-tag="buttonAddPlayer"]')
    expect(called).toBe(false)
    button.simulate('click')
    expect(called).toBe(true)
  })

  it(`always mounts a Table component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Table.length).toBe(1)
    })
  })

  it(`always mounts a TableHeader component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.TableHeader.length).toBe(1)
    })
  })

  it(`always passes props.players to Table as dataSource`, () => {
    forEach(scenes, scene => {
      const sceneProps = scene.props
      const tableProps: TableProps<any> = scene.elements.Table.props()
      expect(tableProps.dataSource).toEqual(sceneProps.players)
    })
  })

  it(`always passes ${expectedColumns.length} columns to Table`, () => {
    forEach(scenes, scene => {
      const tableProps: TableProps<any> = scene.elements.Table.props()
      expect(tableProps).toHaveProperty('columns')
      expect(tableProps.columns!.length).toEqual(expectedColumns.length)
    })
  })

  it(`always renders ${expectedColumns.length} th elements`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.th.length).toBe(expectedColumns.length)
    })
  })

  forEach(expectedColumns, (
    columnKey: ColumnProps<any>['key'],
    columnIndex: number,
  ) => {

    describe(`${columnKey} column`, () => {
      it(`always passes '${columnKey}' column to Table`, () => {
        forEach(scenes, scene => {
          const tableProps: TableProps<any> = scene.elements.Table.props()
          const found: ColumnProps<any> | undefined = find(tableProps.columns, { key: columnKey })
          expect(!!found).toBe(true)
        })
      })
    
      it(`passes a column renderer for '${columnKey}' to Table `, () => {
        forEach(scenes, scene => {
          const tableProps: TableProps<any> = scene.elements.Table.props()
          const found: ColumnProps<any> | undefined = find(tableProps.columns, { key: columnKey })
          expect(found).toHaveProperty('render')
        })
      })
    
      it(`mounts the column renderer for '${columnKey}'`, () => {
        forEach(scenes, scene => {
          const tableProps: TableProps<any> = scene.elements.Table.props()
          const found: ColumnProps<any> | undefined = find(tableProps.columns, { key: columnKey })
          const renderColumn: ColumnProps<any>['render'] = found!.render!
          const mounted = mount(
            <React.Fragment>
              {renderColumn(
                '',
                mockProps.players[0],
                0,
              )}
            </React.Fragment>
          )
          expect(mounted.length).toBe(1)
        })
      })
  
      if (columnKey === 'avatar') {
        it(`mounts an AvatarSelect in the column renderer for 'avatar' when editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            const mounted = mountColumn(scene, mockPlayer, 'avatar')
            if (sceneProps.editing === mockPlayer.id) {
              expect(mounted.find(AvatarSelect).length).toBe(1)
            }
          })
        })
  
        it(`mounts an AvatarDisplay in the column renderer for 'avatar' when not editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            const mounted = mountColumn(scene, mockPlayer, 'avatar')
            if (sceneProps.editing !== mockPlayer.id) {
              expect(mounted.find(AvatarSelect).length).toBe(0)
              expect(mounted.find(AvatarDisplay).length).toBe(1)
            }
          })
        })
      }
  
      if (columnKey === 'name') {
        it(`mounts a NameEdit in the column renderer for 'name' when editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'name')
              expect(mounted.find(NameEdit).length).toBe(1)
            }
          })
        })
  
        it(`does not mount a NameEdit in the column renderer for 'name' when not editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing !== mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'name')
              expect(mounted.find(NameEdit).length).toBe(0)
            }
          })
        })

        it(`passes editField to NameEdit in the column renderer for 'name' when editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const instance: any = scene.component.instance()
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'name')
              const nameEditProps = mounted.find(NameEdit).props()
              expect(nameEditProps.editField).toEqual(instance.editField)
            }
          })
        })

        it(`passes sortPlayersByName as sorter for 'name' column`, () => {
          forEach(scenes, scene => {
            const instance: any = scene.component.instance()
            const sortPlayersByName = instance.sortPlayersByName
            const columnData: any = findColumn(scene, 'name')
            expect(columnData.sorter).toEqual(sortPlayersByName)
          })
        })

        it(`calls sortUtils.sortBySurname when sortPlayersByName is called`, () => {
          forEach(scenes, scene => {
            const instance: any = scene.component.instance()
            const sortPlayersByName = instance.sortPlayersByName
            expect(spies.sortBySurname).not.toHaveBeenCalled()
            sortPlayersByName(players[0], players[1])
            expect(spies.sortBySurname).toHaveBeenCalled()
            spies.sortBySurname.mockClear()
          })
        })
      }

      if (columnKey === 'country') {
        it(`mounts a WrappedCountrySelect in the column renderer for 'country' when editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'country')
              expect(mounted.find(WrappedCountrySelect).length).toBe(1)
            }
          })
        })

        it(`does not mount a WrappedCountrySelect in the column renderer for 'country' when not editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing !== mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'country')
              expect(mounted.find(WrappedCountrySelect).length).toBe(0)
            }
          })
        })

        it(`mounts a CountryDisplay in the column renderer for 'country' when not editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing !== mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'country')
              expect(mounted.find(CountryDisplay).length).toBe(1)
            }
          })
        })

        it(`calls editField when WrappedCountrySelect changes while editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted: any = mountColumn(scene, mockPlayer, 'country')
              const selectProps = mounted.find(WrappedCountrySelect).props()
              const value: Player['country'] = 'US'
              expect(spies.editField).not.toHaveBeenCalled()
              selectProps.onChange(value)
              expect(spies.editField).toHaveBeenCalled()
              spies.editField.mockClear()
            }
          })
        })

        it(`calls sortUtils.sortAlpha when sortPlayersByCountry is called`, () => {
          forEach(scenes, scene => {
            const instance: any = scene.component.instance()
            const sortPlayersByCountry = instance.sortPlayersByCountry
            expect(spies.sortAlpha).not.toHaveBeenCalled()
            sortPlayersByCountry(players[0], players[1])
            expect(spies.sortAlpha).toHaveBeenCalled()
            spies.sortAlpha.mockClear()
          })
        })
      }

      if (columnKey === 'winnings') {
        it(`mounts an InputNumber in the column renderer for 'winnings' when editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'winnings')
              expect(mounted.find(InputNumber).length).toBe(1)
            }
          })
        })

        it(`does not mount an InputNumber in the column renderer for 'winnings' when not editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing !== mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'winnings')
              expect(mounted.find(InputNumber).length).toBe(0)
            }
          })
        })

        it(`calls editField when InputNumber changes while editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted: any = mountColumn(scene, mockPlayer, 'winnings')
              const selectProps = mounted.find(InputNumber).props()
              const value: Player['winnings'] = 1000
              expect(spies.editField).not.toHaveBeenCalled()
              selectProps.onChange(value)
              expect(spies.editField).toHaveBeenCalled()
              spies.editField.mockClear()
            }
          })
        })

        it(`does not call editField when InputNumber changes to non-numeric value`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted: any = mountColumn(scene, mockPlayer, 'winnings')
              const selectProps = mounted.find(InputNumber).props()
              const value: string = 'ABCDEFG'
              expect(spies.editField).not.toHaveBeenCalled()
              selectProps.onChange(value)
              expect(spies.editField).not.toHaveBeenCalled()
              spies.editField.mockClear()
            }
          })
        })

        it(`calls sortUtils.sortNumeric when sortPlayersByWinnings is called`, () => {
          forEach(scenes, scene => {
            const instance: any = scene.component.instance()
            const sortPlayersByWinnings = instance.sortPlayersByWinnings
            spies.sortNumeric.mockClear()
            expect(spies.sortNumeric).not.toHaveBeenCalled()
            sortPlayersByWinnings(players[0], players[1])
            expect(spies.sortNumeric).toHaveBeenCalled()
            spies.sortNumeric.mockClear()
          })
        })
      }

      if (columnKey === 'actions') {
        it(`mounts CancelSaveButtons in the column renderer for 'actions' when editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              expect(mounted.find(CancelSaveButtons).length).toBe(1)
            }
          })
        })

        it(`disables CancelSaveButtons in the column renderer for 'actions' when saving edited player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (
              sceneProps.editing === mockPlayer.id &&
              sceneProps.savingEditedPlayer
            ) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              const buttonProps = mounted.find(CancelSaveButtons).props()
              expect(buttonProps.disabled).toBe(true)
            }
          })
        })

        it(`calls props.cancelEditPlayer when CancelSaveButtons onCancel is called`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing === mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              const buttons = mounted.find(CancelSaveButtons)
              const onCancel = buttons.props().onCancel
              expect(spies.cancelEditPlayer).not.toHaveBeenCalled()
              onCancel()
              expect(spies.cancelEditPlayer).toHaveBeenCalled()
              spies.cancelEditPlayer.mockClear()
            }
          })
        })

        it(`calls props.saveEditedPlayer when CancelSaveButtons onSave is called with unsaved changes`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            const unsavedChanges = sceneProps.playerEdits[mockPlayer.id]
            if (
              sceneProps.editing === mockPlayer.id &&
              unsavedChanges && keys(unsavedChanges).length
            ) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              const buttons = mounted.find(CancelSaveButtons)
              const onSave = buttons.props().onSave
              expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
              onSave()
              expect(spies.saveEditedPlayer).toHaveBeenCalled()
              spies.saveEditedPlayer.mockClear()
            }
          })
        })

        it(`calls props.cancelEditPlayer when CancelSaveButtons onSave is called without unsaved changes`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            const unsavedChanges = sceneProps.playerEdits[mockPlayer.id]
            if (
              sceneProps.editing === mockPlayer.id &&
              (!unsavedChanges || !keys(unsavedChanges).length)
            ) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              const buttons = mounted.find(CancelSaveButtons)
              const onSave = buttons.props().onSave
              expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
              expect(spies.cancelEditPlayer).not.toHaveBeenCalled()
              onSave()
              expect(spies.saveEditedPlayer).not.toHaveBeenCalled()
              expect(spies.cancelEditPlayer).toHaveBeenCalled()
              spies.saveEditedPlayer.mockClear()
              spies.cancelEditPlayer.mockClear()
            }
          })
        })

        it(`mounts EditDeleteButtons in the column renderer for 'actions' when not editing player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing !== mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              expect(mounted.find(EditDeleteButtons).length).toBe(1)
            }
          })
        })

        it(`disables EditDeleteButtons in the column renderer for 'actions' when deleting player`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (
              sceneProps.editing !== mockPlayer.id &&
              sceneProps.deletingPlayer === mockPlayer.id
            ) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              const buttonProps = mounted.find(EditDeleteButtons).props()
              expect(buttonProps.disabled).toBe(true)
            }
          })
        })

        it(`calls props.editPlayer when EditDeleteButtons onEdit is called`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing !== mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              const buttons = mounted.find(EditDeleteButtons)
              const onEdit = buttons.props().onEdit
              expect(spies.editPlayer).not.toHaveBeenCalled()
              onEdit()
              expect(spies.editPlayer).toHaveBeenCalled()
              spies.editPlayer.mockClear()
            }
          })
        })

        it(`calls props.deletePlayer when EditDeleteButtons onDelete is called`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (sceneProps.editing !== mockPlayer.id) {
              const mounted = mountColumn(scene, mockPlayer, 'actions')
              const buttons = mounted.find(EditDeleteButtons)
              const onDelete = buttons.props().onDelete
              expect(spies.deletePlayer).not.toHaveBeenCalled()
              onDelete()
              expect(spies.deletePlayer).toHaveBeenCalled()
              spies.deletePlayer.mockClear()
            }
          })
        })
      }

      if (columnKey === 'loading') {
        it(`always mounts a Spin component in column renderer for 'loading'`, () => {
          forEach(scenes, scene => {
            const mockPlayer = mockProps.players[0]
            const mounted = mountColumn(scene, mockPlayer, 'loading')
            expect(mounted.find(Spin).length).toBe(1)
          })
        })

        it(`spins the Spin component in column renderer for 'loading' if saving or deleting`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (
              (sceneProps.editing === mockPlayer.id && sceneProps.savingEditedPlayer) ||
              (sceneProps.deletingPlayer === mockPlayer.id)
            ) {
              const mounted = mountColumn(scene, mockPlayer, 'loading')
              const spinnerProps = mounted.find(Spin).props()
              expect(spinnerProps.spinning).toBe(true)
            }
          })
        })

        it(`does not spin the Spin component in column renderer for 'loading' unless saving or deleting`, () => {
          forEach(scenes, scene => {
            const sceneProps = scene.props
            const mockPlayer = mockProps.players[0]
            if (
              !(sceneProps.editing === mockPlayer.id && sceneProps.savingEditedPlayer) &&
              !(sceneProps.deletingPlayer === mockPlayer.id)
            ) {
              const mounted = mountColumn(scene, mockPlayer, 'loading')
              const spinnerProps = mounted.find(Spin).props()
              expect(spinnerProps.spinning).toBe(false)
            }
          })
        })
      }
    })
  })
})
