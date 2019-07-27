import React from 'react'
import { Routes } from '@gem-mine/durex'
import style from './style'

export default class TakeoutWrap extends React.Component {
  render() {
    return (
      <div className={style.takeoutWrap}>
        <Routes path="takeout" />
      </div>
    )
  }
}
