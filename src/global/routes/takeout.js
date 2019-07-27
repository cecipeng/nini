import { asyncLoad } from 'global/util/async-load'

import Home from 'components/home'
import List from 'components/takeout/pages/list'

export default {
  path: '/',
  component: Home,
  description: '外卖容器层',
  sub: {
    entry: {
      path: '/list',
      component: List,
      description: '外卖列表页',
      index: true,
      exact: true,
      module: {
        detail: {
          description: '外卖表单',
          path: '/:id',
          component: asyncLoad('components/takeout/pages/orderForm')
        }
      }
    },
    myOrder: {
      path: '/myOrder',
      component: asyncLoad('components/takeout/pages/myOrder'),
      description: '我的订单页'
    }
  }
}
