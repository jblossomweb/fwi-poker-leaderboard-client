import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import { themes } from '@storybook/components'
import { configureViewport } from '@storybook/addon-viewport'
import '@storybook/addon-console'

addDecorator(
  withOptions({
    name: process.env.REACT_APP_NAME,
    theme: themes.dark,
  })
)

configureViewport()

// import stories ending in *.story.tsx
const req = require.context('../src', true, /.story.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
