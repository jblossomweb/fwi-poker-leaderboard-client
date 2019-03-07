import 'jest-canvas-mock'
import forEach from 'lodash/forEach'
import { Spin } from 'antd'
import { Chart, Geom } from 'bizcharts'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios } from './TopPlayersBarChart.test.story'
import TopPlayersBarChart from './TopPlayersBarChart'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  TopPlayersBarChart,
  component => ({
    Spin: component.find(Spin),
    Chart: component.find(Chart),
    Geom: component.find(Geom),
}))

describe('components/TopPlayersBarChart', () => {
  it(`always mounts the TopPlayersBarChart component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`always mounts a Spin component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Spin.length).toBe(1)
    })
  })
  it(`spins the Spin component when fetchingPlayers is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.fetchingPlayers) {
        expect(scene.elements.Spin.props().spinning).toBe(true)
      }
    })
  })
  it(`mounts a Chart component when fetchingPlayers is false`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        expect(scene.elements.Chart.length).toBe(1)
      }
    })
  })
  it(`does not mount a Chart component when fetchingPlayers is true`, () => {
    forEach(scenes, scene => {
      if (scene.props.fetchingPlayers) {
        expect(scene.elements.Chart.length).toBe(0)
      }
    })
  })
  it(`mounts a single Geom component when fetchingPlayers is false`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        expect(scene.elements.Geom.length).toBe(1)
      }
    })
  })
  it(`defines a tooltip prop for Geom component when fetchingPlayers is false`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        expect(scene.elements.Geom.props()).toHaveProperty('tooltip')
      }
    })
  })
  it(`uses winnings in a tooltip prop for Geom component`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        const geomProps = scene.elements.Geom.props()
        const fields = geomProps.tooltip[0]
        expect(fields).toEqual('winnings') 
      }
    })
  })
  it(`formats winnings value in a tooltip prop for Geom component`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        const geomProps = scene.elements.Geom.props()
        const formatter = geomProps.tooltip[1]
        const formatted = formatter(1000)
        expect(formatted.value).toEqual('$1,000')
        const nocommas = formatter(100)
        expect(nocommas.value).toEqual('$100')
      }
    })
  })
})
