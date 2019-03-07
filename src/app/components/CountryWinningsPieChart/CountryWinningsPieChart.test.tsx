import 'jest-canvas-mock'
import forEach from 'lodash/forEach'
import { Spin } from 'antd'
import DataSet from '@antv/data-set'
import { Chart, Geom } from 'bizcharts'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios } from './CountryWinningsPieChart.test.story'
import CountryWinningsPieChart from './CountryWinningsPieChart'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  CountryWinningsPieChart,
  component => ({
    Spin: component.find(Spin),
    Chart: component.find(Chart),
    Geom: component.find(Geom),
}))

describe('components/CountryWinningsPieChart', () => {
  it(`always mounts the CountryWinningsPieChart component`, () => {
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
  it(`transforms the data view for the Chart component when there is pie data`, () => {
    forEach(scenes, scene => {
      if (scene.props.countryWinningsPieData.length) {
        const chartProps = scene.elements.Chart.props()
        const expected = new DataSet.DataView()
        expected.source(scene.props.countryWinningsPieData).transform({
          type: 'percent',
          field: 'winnings',
          dimension: 'country',
          as: 'percent',
        })
        expect(chartProps.data.rows).toEqual(expected.rows)
      }
    })
  })
  it(`does not transform the data view for the Chart component when there is no pie data`, () => {
    forEach(scenes, scene => {
      if (!scene.props.countryWinningsPieData.length) {
        const chartProps = scene.elements.Chart.props()
        const expected = new DataSet.DataView()
        expect(chartProps.data.rows).toEqual(expected.rows)
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
  it(`uses country and winnings in a tooltip prop for Geom component`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        const geomProps = scene.elements.Geom.props()
        const fields = geomProps.tooltip[0]
        expect(fields).toEqual('country*winnings') 
      }
    })
  })
  it(`formats winnings value in a tooltip prop for Geom component`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        const geomProps = scene.elements.Geom.props()
        const formatter = geomProps.tooltip[1]
        const formatted = formatter('US', 1000)
        expect(formatted.value).toEqual('$1,000')
        const nocommas = formatter('US', 100)
        expect(nocommas.value).toEqual('$100')
      }
    })
  })
  it(`formats country name in a tooltip prop for Geom component`, () => {
    forEach(scenes, scene => {
      if (!scene.props.fetchingPlayers) {
        const instance: any = scene.component.instance()
        const geomProps = scene.elements.Geom.props()
        const formatter = geomProps.tooltip[1]
        const formatted = formatter('US', 1000)
        expect(formatted.name).toEqual(instance.displayCountry('US', 'name'))
      }
    })
  })
  describe('displayCountry', () => {
    it(`returns name field when field is 'name'`, () => {
      forEach(scenes, scene => {
        const instance: any = scene.component.instance()
        const value = instance.displayCountry('US', 'name')
        expect(value).toEqual('United States')
      })
    })
    it(`returns emoji field when field is 'emoji'`, () => {
      forEach(scenes, scene => {
        const instance: any = scene.component.instance()
        const value = instance.displayCountry('US', 'emoji')
        expect(value).toEqual('🇺🇸')
      })
    })
    it(`fails gracefully when code is not found`, () => {
      forEach(scenes, scene => {
        const instance: any = scene.component.instance()
        const value = instance.displayCountry('XX', 'name')
        expect(value).toEqual('')
      })
    })
  })
})
