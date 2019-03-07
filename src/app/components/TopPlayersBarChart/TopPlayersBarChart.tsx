import React from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import {
  Chart,
  Geom,
  GeomProps,
  Axis,
  Tooltip,
} from 'bizcharts'

import { formatBigNumber } from 'core/tables/display.utils'

import CountryDisplay from 'app/components/CountryDisplay'
import AvatarDisplay from 'app/components/AvatarDisplay'

import { Player } from 'app/store/players/types'
import styles from './TopPlayersBarChart.module.css'

export interface Props {
  fetchingPlayers: boolean,
  fetchPlayersError: Error | null,
  topPlayersBarData: Player[],
}

class TopPlayersBarChart extends React.Component<Props> {
  render() {
    const { topPlayersBarData, fetchingPlayers } = this.props

    const scale = {
      winnings: { min: 0 },
    }

    const color: GeomProps['color'] = ['name', ['#7f8da9', '#fec514', '#db4c3c']]

    const tooltip: GeomProps['tooltip'] = ['winnings', (winnings: number) => ({
      name: 'Winnings',
      value: `$${winnings.toLocaleString()}`,
    })]
    
    return (
      <Spin spinning={fetchingPlayers} tip={`Fetching Players...`}>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            {topPlayersBarData && topPlayersBarData.map(player => (
              <div className={styles.item} key={player.id}>
                <div>
                  <span className={styles.avatar}>
                    <AvatarDisplay player={player} size={`3em`} />
                  </span>
                  <span className={styles.name}>{player.name}</span>
                  <CountryDisplay code={player.country} />
                </div>
                <div>
                  <span className={styles.winnings}>
                    {`$${player.winnings.toLocaleString()}`}
                  </span>
                </div>
              </div>
            ))}
            <div className={styles.item}>
              <Link to={`player-winnings`}>See All</Link>
            </div>
          </div>
          <div className={styles.chart}>
            {!fetchingPlayers ? (
              <Chart
                height={400}
                width={400}
                data={topPlayersBarData}
                padding={[20, 20, 40, 48]}
                scale={scale}
              >
                <Axis
                  name={`winnings`}
                  label={{
                    formatter: (value: string) => `$${formatBigNumber(Number(value), 0)}`
                  }}
                />
                <Geom
                  type={`interval`}
                  position={`name*winnings`}
                  size={80}
                  color={color}
                  tooltip={tooltip}
                />
                <Tooltip />
              </Chart>
            ) : null}
          </div>
        </div>
      </Spin>
    )
  }
}

export default TopPlayersBarChart
