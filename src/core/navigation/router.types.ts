import { RouteProps } from 'react-router-dom'

export interface MenuRoute {
  title: string,
  path: string,
  page?: RouteProps['component'],
  childRoutes?: MenuRoute[]
}

export interface HiddenRoute {
  path: string,
  page: RouteProps['component'],
}

export interface RouteRedirect {
  from?: string,
  to: string,
}
