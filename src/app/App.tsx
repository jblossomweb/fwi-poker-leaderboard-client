import React from 'react'
import { Provider } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'

import { getHistory } from 'core/store/history.utils'
import { getInitialState } from 'core/store/state.utils'
import composeStore from 'core/store/compose'

import rootReducer from 'app/store/rootReducer'

import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

const store = composeStore(getInitialState(), rootReducer)

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={getHistory()}>
      <Switch>
        <Route exact={true} path={`/home`} component={HomePage} />
        <Route exact={true} path={`/404`} component={NotFoundPage} />
        <Redirect exact={true} from={``} to={`/home`} />
        <Redirect exact={true} from={`/`} to={`/home`} />
        <Redirect exact={true} to={`/404`} />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default App
