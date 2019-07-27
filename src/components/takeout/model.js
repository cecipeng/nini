import durex from '@gem-mine/durex'
import request from '@gem-mine/request'
const { takeout } = request

durex.model({
  name: 'takeout',
  state: {
    // count: 7
    productList: [],
    userOrders: []
  },
  reducers: {
  },
  effects: {
    getProductList() {
      takeout.get('/product/list')
        .then(res => {
          this.setField({
            productList: res.data || []
          })
        })
    },
    setUserOrders(arr) {
      this.setField({
        userOrders: Array.isArray(arr) ? arr : []
      })
    }
  }
})
