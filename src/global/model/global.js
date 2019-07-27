import durex from '@gem-mine/durex'

durex.model({
  name: 'global',
  state: {
    title: ''
  },
  reducers: {},
  effects: {
    setTitle(title) {
      return this.setField({
        title
      })
    }
    
  }
})
