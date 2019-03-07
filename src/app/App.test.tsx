import React from 'react'
import ReactDOM from 'react-dom'
import 'jest-canvas-mock'
import App from './App'

describe('App (smoke test)', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
