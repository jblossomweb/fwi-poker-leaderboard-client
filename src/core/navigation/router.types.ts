import { RouteProps } from 'react-router-dom'
import { IconProps } from 'antd/lib/icon'

export interface MenuRoute {
  title: string,
  icon?: IconProps['type'],
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
