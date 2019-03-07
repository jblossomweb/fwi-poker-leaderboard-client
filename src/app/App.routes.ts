import { HiddenRoute, RouteRedirect } from 'core/navigation/router.types'
import { AppMenuRoute } from 'app/custom.types'
import HomePage from './pages/HomePage'
import PlayerWinningsPage from './pages/PlayerWinningsPage'
import NotFoundPage from './pages/NotFoundPage'

export const menuRoutes: AppMenuRoute[] = [
  {
    title: `Home`,
    icon: `home`,
    path: `/home`,
    page: HomePage,
  },
  {
    title: `Player Winnings`,
    icon: `dollar`,
    path: `/player-winnings`,
    page: PlayerWinningsPage,
  },
]

export const hiddenRoutes: HiddenRoute[] = [
  {
    path: `/404`,
    page: NotFoundPage,
  },
]

export const redirects: RouteRedirect[] = [
  {
    from: ``,
    to: `/home`,
  },
  {
    from: `/`,
    to: `/home`,
  },
  {
    to: `/404`
  },
]
