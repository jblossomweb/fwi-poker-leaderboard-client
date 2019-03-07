import React from 'react'
import { History } from 'history'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import { AppMenuRoute } from 'app/custom.types'

import styles from './MainMenu.module.css'

export interface Props {
  history: History,
  routes: AppMenuRoute[],
  current: AppMenuRoute['path'],
}

export const MainMenuItemTitle = (
  route: AppMenuRoute,
) => (
  <span data-tag={`itemTitleWrapper`}>
    {route.icon && (<Icon type={route.icon} />)}
    <span data-tag={`itemTitle`}>{route.title}</span>
  </span>
)

export const MainMenuItem = (
  route: AppMenuRoute,
) => route.childRoutes ? (
  <Menu.SubMenu
    className={styles.subMenu}
    key={route.path}
    title={<MainMenuItemTitle {...route} />}
  >
    {route.childRoutes.map(MainMenuItem)}
  </Menu.SubMenu>
) : (
  <Menu.Item key={route.path}>
    <MainMenuItemTitle {...route} />
  </Menu.Item>
)

export default (
  props: Props,
) => {
  return (
    <div className={styles.wrapper}>
      <Menu
        className={styles.menu}
        theme={`dark`}
        mode={`horizontal`}
        defaultSelectedKeys={[
          props.current,
        ]}
        selectedKeys={[
          props.current,
        ]}
        onClick={event => {
          props.history.push(event.key)
        }}
      >
        {props.routes.map(MainMenuItem)}
      </Menu>
    </div>
  )
}
