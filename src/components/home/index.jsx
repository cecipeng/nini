import React from 'react'
import style from './style'
import TakeoutWrap from '../takeout'
import Header from '../common/header'

export default class Home extends React.Component {
  render() {
    return (
      <div className={style.main}>
        {/* <Header /> */}
        <TakeoutWrap />
      </div>
    )
  }
}
