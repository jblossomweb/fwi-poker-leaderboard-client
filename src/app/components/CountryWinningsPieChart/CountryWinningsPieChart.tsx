import React from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from 'bizcharts'
import { Spin } from 'antd'
import DataSet from '@antv/data-set'

import { Player } from 'app/store/players/types'
import { findByCode } from 'app/components/CountryDisplay'

import styles from './CountryWinningsPieChart.module.css'

export interface Props {
  fetchingPlayers: boolean,
  fetchPlayersError: Error | null,
  countryWinningsPieData: {
    country: Player['country'],
    winnings: Player['winnings'],
  }[],
}

class CountryWinningsPieChart extends React.Component<Props> {
  scale = {
    percent: {
      formatter: (val: number): string => Math.round(val * 100) + '%',
    }
  }

  displayCountry = (
    code: Player['country'],
    field: string,
  ): string => {
    const country = findByCode(code)
    if (country) {
      return country[field]
    }
    return ''
  }

  render() {
    const { displayCountry, scale } = this
    const { countryWinningsPieData, fetchingPlayers } = this.props

    const dv = new DataSet.DataView()
    if (countryWinningsPieData.length) {
      dv.source(countryWinningsPieData).transform({
        type: 'percent',
        field: 'winnings',
        dimension: 'country',
        as: 'percent',
      })
    }

    return (
      <Spin spinning={fetchingPlayers} tip={`Fetching Players...`}>
        <div className={styles.wrapper}>
        {!fetchingPlayers ? (
          <Chart
            height={400}
            width={400}
            data={dv}
            scale={scale}
            padding={[20, 20, 40, 48]}
          >
            <Coord type={`theta`} radius={0.75} />
            <Axis name={`percent`} />
            <Legend
              position={`bottom`}
              offsetY={0}
              offsetX={0}
              itemFormatter={code => displayCountry(code, 'emoji')}
            />
            <Tooltip
              showTitle={false}
              itemTpl={`<li>{name}: {value}</li>`}
            />
            <Geom
              type={`intervalStack`}
              position={`percent`}
              color={`country`}
              style={{ lineWidth: 1, stroke: '#fff' }}
              tooltip={[
                'country*winnings',
                (country, winnings) => ({
                  name: displayCountry(country, 'name'),
                  value: `$${winnings.toLocaleString()}`
                })
              ]}
            >
              <Label
                content="percent"
                formatter={(
                  val, { point }
                ) => `${displayCountry(point.country, 'emoji')} ${val}`}
              />
            </Geom>
          </Chart>
        ) : null}
        </div>
      </Spin>
    )
  }
}

export default CountryWinningsPieChart
