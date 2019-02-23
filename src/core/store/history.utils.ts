import createBrowserHistory from 'history/createBrowserHistory'
import { History } from 'history'

let history: History | null = null

export function createHistory(): History {
  history = createBrowserHistory()
  return history
}

export function getHistory(): History {
  return history ? history : createHistory()
}
