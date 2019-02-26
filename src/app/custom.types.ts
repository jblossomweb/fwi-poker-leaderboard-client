import { IconProps } from 'antd/lib/icon'
import { MenuRoute } from 'core/navigation/router.types'

export interface AppMenuRoute extends MenuRoute {
  icon?: IconProps['type'],
  childRoutes?: AppMenuRoute[],
}
