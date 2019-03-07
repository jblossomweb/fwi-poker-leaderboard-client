import React from 'react'
import { Provider } from 'react-redux'
import { History } from 'history'
import { Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'

import Affix from 'antd/lib/affix'
import Layout from 'antd/lib/layout'

import { getHistory } from 'core/store/history.utils'
import { getInitialState } from 'core/store/state.utils'
import composeStore from 'core/store/compose'

import { mapMenuRoute, mapHiddenRoute, mapRedirect } from 'core/navigation/router.utils'

import rootReducer from 'app/store/rootReducer'

import { menuRoutes, hiddenRoutes, redirects } from './App.routes'
import ConnectedMainMenu from './App.menu'
import styles from './App.module.css'

const store = composeStore(getInitialState(), rootReducer)
const history: History = getHistory()

export default () => (
  <Provider store={store}>
    <Affix className={styles.header}>
      <Layout.Header className={styles.header}>
        <ConnectedMainMenu
          history={history}
          routes={menuRoutes}
        />
      </Layout.Header>
    </Affix>
    <Layout.Content>
      <ConnectedRouter history={history}>
        <Switch>
          {menuRoutes.map(mapMenuRoute)}
          {hiddenRoutes.map(mapHiddenRoute)}
          {redirects.map(mapRedirect)}
        </Switch>
      </ConnectedRouter>
    </Layout.Content>
  </Provider>
)
