import React, { ReactFragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { MenuRoute, HiddenRoute, RouteRedirect } from './router.types'

export const mapMenuRoute = (
  route: MenuRoute,
): ReactFragment => route.childRoutes ? route.childRoutes.map(mapMenuRoute) : (
  <Route key={route.path} exact={true} path={route.path} component={route.page} />
)

export const mapHiddenRoute = (
  route: HiddenRoute,
): ReactFragment => (
  <Route key={route.path} exact={true} path={route.path} component={route.page} />
)

export const mapRedirect = (
  redirect: RouteRedirect,
  key: number,
): ReactFragment => (
  <Redirect key={key} exact={true} from={redirect.from} to={redirect.to} />
)
