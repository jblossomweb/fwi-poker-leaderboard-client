import { connect } from 'react-redux'
import { AppState } from 'core/store/state.types'
import { getCurrentRoute } from 'app/store/menu/selectors'
import MainMenu from './components/MainMenu'

export default connect((state: AppState) => ({
  current: getCurrentRoute(state)
}))(MainMenu)
