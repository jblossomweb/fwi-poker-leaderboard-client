import React from 'react'
import { Player } from 'app/store/players/types'
import { Icon, Card, message } from 'antd'
import styles from './HomePage.module.css'

import TopPlayersBarChart from 'app/components/TopPlayersBarChart'
import CountryWinningsPieChart from 'app/components/CountryWinningsPieChart'

export interface StateProps {
  fetchingPlayers: boolean,
  fetchPlayersError: Error | null,
  totalWinnings: number | null,
  topPlayersBarData: Player[],
  countryWinningsPieData: {
    country: Player['country'],
    winnings: Player['winnings'],
  }[],
}

export interface DispatchProps {
  fetchPlayers: () => void,
}

export type Props = StateProps & DispatchProps

const inlineStyles: {[key: string]: React.CSSProperties} = {
  cardHead: {
    backgroundColor: '#011528',
    color: `#fff`,
  }
}

class HomePage extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    message.config({ maxCount: 1 })
    this.messageError = this.messageError.bind(this)
    this.messageDestroy = this.messageDestroy.bind(this)
  }

  messageError(error: string) {
    message.error(error)
  }

  messageDestroy() {
    message.destroy()
  }

  componentDidMount() {
    const { topPlayersBarData, fetchPlayers } = this.props
    if (!topPlayersBarData || !topPlayersBarData.length) {
      fetchPlayers()
    }
  }
  componentDidUpdate() {
    const {
      fetchPlayersError,
    } = this.props
    if (fetchPlayersError) {
      this.messageError(`could not fetch players: ${fetchPlayersError.message}`)
    } else {
      this.messageDestroy()
    }
  }
  render() {
    const {
      totalWinnings,
      topPlayersBarData,
      countryWinningsPieData,
      fetchingPlayers,
      fetchPlayersError,
    } = this.props
    return (
      <div className={styles.wrapper}>
        <h2>
          <span className={styles.title}>
            <span>
              <Icon
                className={styles.titleIcon}
                type={`home`}
                theme={`twoTone`}
              />
              <span>
                Dashboard {
                  totalWinnings ?
                  `(Total Winnings: $${totalWinnings.toLocaleString()})` : 
                  null
                }
              </span>
            </span>
          </span>
        </h2>
        <div className={styles.charts}>
          <div className={styles.chart}>
            <Card 
              title={`🏆 Top 3 Players`}
              headStyle={inlineStyles.cardHead}
            >
              <TopPlayersBarChart
                fetchingPlayers={fetchingPlayers}
                fetchPlayersError={fetchPlayersError}
                topPlayersBarData={topPlayersBarData}
              />
            </Card>
          </div>
          <div className={styles.chart}>
            <Card
              title={`🌎 Country Winnings Breakdown`}
              headStyle={inlineStyles.cardHead}
            >
              <CountryWinningsPieChart
                fetchingPlayers={fetchingPlayers}
                fetchPlayersError={fetchPlayersError}
                countryWinningsPieData={countryWinningsPieData}
              />
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
