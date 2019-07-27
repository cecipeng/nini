import React from 'react'
import { actions, smart } from '@gem-mine/durex'
import style from '../style'

export class List extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }
  componentDidMount() {
    actions.takeout.getProductList()
  }
  goToOrders() {
    this.setState({
      open: false
    }, () => {
      actions.routing.push('/myOrder')
    })
  }
  buy(ele) {
    if (ele.id) {
      actions.routing.push(`/list/${ele.id}`)
    } else {
      // alert('w')
    }
  }
  render() {
    const productList = this.props.productList || []
    const props = this.props
    const { open } = this.state
    return (
      <div>
        <div className={style.header}>
          <span className={style.header__logo}>答!</span>
          <div className={style.header__right} >
            <span onClick={() => { this.goToOrders() }} className={style.header__btn}>提问</span>
          </div>
        </div>
        <div className={style.body}>
          <ul className="tab">
            <li className={style.tab__item}>首页</li>
            <li className={`${style.tab__item} ${open ? style.show : ''}`}>我的提问</li>
          </ul>
          <ul className={style.takeoutList}>
            {productList.length
              ? productList.map((ele, index) => {
                return (<li key={index} className={`${style.takeoutList__item}`} onClick={() => { this.buy(ele) }}>
                  <div className={style.takeoutList__title}>{ele.title}</div>
                  <div className={style.takeoutList__detail}>
                    <span className={style.takeoutList__text}>{ele.detail}</span>
                    <span className={style.takeoutList__link}>显示全部</span>
                  </div>
                  <div className={style.takeoutList__info}>
                    <span className={style.takeoutList__name}>{ele.userId}</span>
                    <span className={style.takeoutList__time}>{ele.time}</span>
                    <span className={style.takeoutList__answer}>{ele.answers.length}个回答</span>
                  </div>
                </li>)
              })
              : null
            }
          </ul>
          <a className={style.takeoutList__more}>加载更多...</a>
        </div>
      </div>
    )
  }
}

export default smart(
  state => {
    return {
      productList: state.takeout.productList,
      title: state.global.title
    }
  },
  props => {
    return {
      goBack() {
        actions.routing.goBack()
      },
      goToOrders() {
        actions.routing.push('/myOrder')
      }
    }
  }
)(List)
