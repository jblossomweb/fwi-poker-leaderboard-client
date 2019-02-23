import React from 'react'
import ReactDOM from 'react-dom'
import root from 'window-or-global'

import config from 'core/config'

const bootstrap = (App: () => JSX.Element) => {
  root.console.log(config.packageName + ' version ' + config.packageVersion)
  ReactDOM.render(<App />, document.getElementById('root'))
}

export default bootstrap
