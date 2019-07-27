import React from 'react'
import { actions, smart } from '@gem-mine/durex'
import style from './style'

export class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }
  toggle(bool) {
    console.log(bool)
    this.setState({
      open: bool
    })
  }
  goToOrders() {
    this.setState({
      open: false
    }, () => {
      actions.routing.push('/myOrder')
    })
  }
  render() {
    const props = this.props
    const { open } = this.state
    return (
      <div className={style.header}>
        <span className={style.header__logo}>答!</span>
        <span className={style.header__left} onClick={props.goBack} />
        <div className={style.header__right} >
          <span onClick={() => { this.goToOrders() }} className={style.header__btn}>提问</span>
          <span onClick={() => { this.goToOrders() }} className={style.header__btn}>我来提问</span>
          <span onClick={() => this.toggle(false)}>刷新</span>
        </div>
        <span className={style.header__text}>{props.title}</span>
      </div>
    )
  }
}

export default smart(
  state => {
    return {
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
)(Header)
