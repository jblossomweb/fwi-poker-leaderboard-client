import * as serviceWorker from 'core/serviceWorker'
import bootstrap from 'core/bootstrap'

import App from 'app/App'
import 'app/index.css'

// bootstrap the app
bootstrap(App)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
