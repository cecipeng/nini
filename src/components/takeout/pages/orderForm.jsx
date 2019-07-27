import React from 'react'
import { actions, smart } from '@gem-mine/durex'
import request from '@gem-mine/request'
import style from '../style'
// const { takeout } = request

export class OrderForm extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {},
      productList: {}
    }
  }
  componentDidMount() {
    const props = this.props
    const { id } = props.match.params
    
    if (id && props.productList.length) {
      this.setState({
        product: props.productList.find(ele => String(ele.id) === String(id))
      })
    } else {
      actions.routing.replace('/')
    }
  }


  render() {
    const { product } = this.state
    const props = this.props
    const productList = this.props.productList || []
    console.log(product)
    
    return (
      <div>
        <div className={style.header}>
        <span className={style.header__left} onClick={props.goBack} />
          <div className={style.header__right} >
            <span onClick={() => { this.goToOrders() }} className={style.header__btn}>我来回答</span>
          </div>
          <span className={style.header__text}>我来回答</span>
        </div>
        <div className={style.body}>
          {Object.keys(product).length>0 && <ul className={style.takeoutList}>
            <li className={style.takeoutList__item}>
              <div className={style.takeoutList__title}>{product.title}</div>
              <div className={style.takeoutList__detail}>
                <span className={style.takeoutList__text}>{product.detail}</span>
              </div>
              <div className={style.takeoutList__info}>
                <span className={style.takeoutList__name}>{product.userId}</span>
                <span className={style.takeoutList__time}>{product.time}</span>
                <span className={style.takeoutList__answer}>{product.answers.length}个回答</span>
              </div>
            </li>
          </ul>}
          <ul className={style.takeoutList}>
            {product.answers
              ? product.answers.map((ele, index) => {
                return (<li key={index} className={`${style.takeoutList__item}`}>
                  <div className={style.takeoutList__info}>
                    <span className={style.takeoutList__name}>{ele.userId}</span>
                    <span className={style.takeoutList__time}>{ele.time}</span>
                    <div className={style.takeoutList__oper}>
                      <span className={style.takeoutList__zan}>{ele.good}</span>
                      <span className={style.takeoutList__bad}>{ele.bad}</span>
                    </div>
                  </div>
                  <div className={style.takeoutList__text}>{ele.answers}</div>
                </li>)
              })
              : null
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default smart(
  state => {
    return {
      productList: state.takeout.productList
    }
  },
  props => {
    return {
      goBack() {
        actions.routing.goBack()
      }
    }
  }
)(OrderForm)
