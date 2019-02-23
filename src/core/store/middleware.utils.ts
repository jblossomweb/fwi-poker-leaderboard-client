import { Middleware } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import thunk from 'redux-thunk'

import { getHistory } from './history.utils'

export const getMiddlewares = () => {
  const middlewares: Middleware[] = [
    thunk,
    routerMiddleware(getHistory()),
  ]
  return middlewares
}
