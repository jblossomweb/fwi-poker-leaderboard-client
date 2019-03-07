import 'jest-canvas-mock'
import { Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { AppState } from 'core/store/state.types'
import { PlayersServiceInterface } from 'app/services/players/types'
import LivePlayersService from 'app/services/players/service'

import playerSelectors from 'app/store/players/selectors'
import playerActions from 'app/store/players/action.creators'

import HomePage, {
  DispatchProps,
} from './HomePage'

export const mapStateToProps = (
  state: AppState,
) => ({
  fetchingPlayers: playerSelectors.getFetchingPlayers(state),
  fetchPlayersError: playerSelectors.getFetchPlayersError(state),
  totalWinnings: playerSelectors.getTotalWinnings(state),
  topPlayersBarData: playerSelectors.getTopPlayersBarData(state),
  countryWinningsPieData: playerSelectors.getCountryWinningsPieData(state),
})

export const mapDispatchToProps = (
  playersService: PlayersServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  fetchPlayers: () => dispatch(
    playerActions.fetchPlayers(playersService)(dispatch)
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps(LivePlayersService),
)(withImmutablePropsToJS(HomePage))
