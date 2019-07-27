import React from 'react'
import { actions, smart } from '@gem-mine/durex'
import request from '@gem-mine/request'
import style from '../style'

export class OrderForm extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {},
      isAnswering: false,
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
  componentWillReceiveProps (nextProps) {
    const { id } = this.props.match.params

    if (this.props.productList !== nextProps.productList) {
      this.setState({
        product: nextProps.productList.find(ele => String(ele.id) === String(id))
      })
    }
  }

  // 回答列表排序
  sortAnswers (answers) {
    return answers.sort((a,b) => {
      const diff_a = a.good - a.bad
      const diff_b = b.good - b.bad
      return diff_a === diff_b ? 
      new Date(a.time).getTime() - new Date(b.time).getTime()
      : diff_b - diff_a
    })
  }

  // 点赞
  handleClickGoodOrBad(answersId, goodOrBad) {
    const { productList } = this.props
    const { product } = this.state
    productList.forEach((ele) => {
      if (ele.id === product.id) {
        ele.answers.forEach((answer) => {
          answer.answersId === answersId && parseInt(answer[goodOrBad]++)
        })
      }
    })
    actions.takeout.updateProductList(productList)
  }
  render() {
    const { product, isAnswering } = this.state
    const props = this.props
    let answersSorted

    answersSorted = product.answers && this.sortAnswers(product.answers)
    return (
      <div>
        <div className={style.header}>
        <span className={style.header__left} onClick={props.goBack} />
          <div className={style.header__right} >
            {
              !isAnswering && (<span onClick={() => { this.goToOrders() }} className={style.header__btn}>我来回答</span>)
            }
          </div>
          <span className={style.header__text}>我来回答</span>
        </div>
        <div className={style.body}>
          {Object.keys(product).length > 0 && 
            <ul className={style.takeoutList}>
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
            </ul>
          }
          <ul className={style.takeoutList}>
            {
              answersSorted ? answersSorted.map((ele, index) => {
                return (
                  <li key={index} className={`${style.takeoutList__item}`}>
                    <div className={style.takeoutList__info}>
                      <span className={style.takeoutList__name}>{ele.userId}</span>
                      <span className={style.takeoutList__time}>{ele.time}</span>
                      <div className={style.takeoutList__oper}>
                        <span className={style.takeoutList__zan} onClick={() => {this.handleClickGoodOrBad(ele.answersId, 'good')}}>{ele.good > 999 ? '999+' : ele.good}</span>
                        <span className={style.takeoutList__bad} onClick={() => {this.handleClickGoodOrBad(ele.answersId, 'bad')}}>{ele.bad > 999 ? '999+' : ele.bad}</span>
                      </div>
                    </div>
                    <div className={style.takeoutList__text}>{ele.answers}</div>
                  </li>
                )
              }) : null
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
