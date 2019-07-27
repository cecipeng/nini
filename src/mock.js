import Mock from 'mockjs'

// Mock.mock('/list', 'get', {
//   "string|1-10": "★"
// })


// {
//   "/api/v0.1/articles": "/articles",
// "/api/v0.1/question": "/question"
// }


let productList = [
  {
    id: 1,
    title: '文言文“太行,王屋二山，文言文“太行,王屋二山，方七百里，高万仞，本在冀州',
    detail: '问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。',
    userId: '任众',
    time: '2017-07-27 10:30',
    answers: [{
      answersId: 1,
      userId: '张三',
      time: '2017-07-20 10:30',
      good: 9,
      bad: 4,
      answers: '这里是回答回答回答这里是回答回答回答1-1'
    },
    {
      answersId: 2,
      userId: '张三三2',
      time: '2017-07-21 10:30',
      good: 5,
      bad: 6,
      answers: '这里是回答回答回答这里是回答回答回答1-2'
    },
    {
      answersId: 3,
      userId: '张三三3',
      time: '2017-07-22 10:30',
      good: 5,
      bad: 6,
      answers: '这里是回答回答回答这里是回答回答回答1-3'
    }]
  },
  {
    id: 2,
    title: '文言文“太行,王屋二山，方七百本在冀州文言文“太行,王屋二山，方七百里，高万仞，本在冀州2222',
    detail: '问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。',
    time: '2017-06-24 10:30',
    userId: '张三',
    answers: [{
      answersId: 1,
      userId: '张三',
      time: '2017-07-23 10:30',
      good: '1024',
      bad: 2,
      answers: '这里是回答回答回答这里是回答回答回答2-1'
    },
    {
      answersId: 2,
      userId: '张三三',
      time: '2017-07-24 10:30',
      good: 998,
      bad: 25,
      answers: '这里是回答回答回答这里是回答回答回答2-2'
    }]
  },
  {
    id: 3,
    title: '文言文“太行,王屋二山，方七百里，高万仞，本在冀州文言文“太行,王屋二山，方七百里，高万仞，本在冀州文言文“太行,王屋二山，方七百里，高万仞，本在冀州3333',
    userId: '李四',
    detail: '问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。问题说明问题说明问题说明问题说明问题说明。问题说明问题说明。',
    time: '2017-05-24 10:30',
    answers: [{
      answersId: 1,
      userId: '张三',
      time: '2017-07-25 10:30',
      good: 99,
      bad: 55,
      answers: '这里是回答回答回答这里是回答回答回答3-1'
    },
    {
      answersId: 2,
      userId: '张三三',
      time: '2017-07-26 10:30',
      good: 90,
      bad: 4,
      answers: '这里是回答回答回答这里是回答回答回答3-2'
    }]
  }
]

let userOrder = [
  {
    productId: 1,
    title: '标题1',
    detail: '问题说明1',
    time: 1558773014066,
    userId: '模拟用户'
  }, {
    productId: 2,
    title: '标题2',
    detail: '问题说明2',
    time: 1558773014066,
    userId: '模拟用户2'
  }, {
    productId: 3,
    title: '标题3',
    detail: '问题说明3',
    time: 1558773014066,
    userId: '模拟用户3'
  }
]

Mock.mock('/product/list', 'get', {
  data: productList
})

Mock.mock('/product/list', 'post', (res, req) => {
  // userOrder
  let order = {
    ...JSON.parse(res.body),
    status: 1
  }
  productList.push(order)
  return userOrder
})
Mock.mock('/product/update', 'post', (res, req) => {
  return JSON.parse(res.body)
})


Mock.mock('/myOrder', 'get', (options) => {
  console.log(options)
  let res = userOrder.map(ele => {
    // ele.title
    const detail = productList.find(product => String(product.id) === String(ele.productId))
    ele.title = detail.title
    ele.detail = detail.detail
    return ele
  })
  // userOrder
  // let order = {
  //   ...JSON.parse(res.body),
  //   status: 1
  // }
  // userOrder.push(order)
  return res
})

// Mock.mock('/test/add', 'post', (res, req) => {
//   console.log(res, req)
//   arr.push(i++)
//   return {0: arr.toString()}
// })
