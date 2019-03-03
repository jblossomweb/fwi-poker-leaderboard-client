export default {
  environment: process.env.NODE_ENV,
  source: process.env.NODE_PATH,
  packageName: process.env.REACT_APP_NAME,
  packageVersion: process.env.REACT_APP_VERSION,
  backgroundColor: process.env.REACT_APP_INITIAL_BGCOLOR,
  reduxDevToolsInProduction: process.env.REACT_APP_ENABLE_REDUX_DEVTOOLS_IN_PRODUCTION,
}
