import React from 'react'
import { actions, smart } from '@gem-mine/durex'
import request from '@gem-mine/request'
import style from '../style'
const { takeout } = request

export class myOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {},
      title: '',
      detail: '',
      open: false
    }
  }
  toggle(bool) {
    console.log(bool)
    this.setState({
      open: bool
    })
  }
  componentDidMount() {
    const props = this.props
  }

  inputChange(e, key) {
    this.setState({
      [key]: key === 'amount' ? (!isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0) : e.target.value
    })
    console.log(key);
  }

  submitJudge() {
    const { title, detail } = this.state
    if (!title) {
      return alert('请输入标题')
    } else if (!detail) {
      return alert('请输入描述')
    }

    this.toggle(true);
  }
  submit() {
    const { title, detail } = this.state
    takeout.post('/product/list', {
      data: {
        userId: '模拟用户',
        title,
        detail,
        time: new Date().getTime(),
      }
    }).then(res => {
      console.log(res)
      if (res) {
        actions.routing.push('/list')
      }
    })
  }

  render() {
    const { product } = this.state
    const props = this.props
    const { open } = this.state
    return (
      <div>
        <div className={style.header}>
        <span className={style.header__left} onClick={props.goBack} />
          <div className={style.header__right} >
            <span onClick={() => this.submitJudge()} className={style.header__btn}>提交</span>
          </div>
          <span className={style.header__text}>发布问题</span>
        </div>
        <div className={style.body}>
          <ul className={style.form}>
            <li className={style.form__item}>
              <span className={style.form__label}>标题：（50字以内的中文、英文或数字）</span>
              <input className={style.form__input} value={this.state.title} onChange={(e) => { this.inputChange(e, 'title') }} placeholder={'请输入问题标题'} />
            </li>
            <li className={style.form__item}>
              <span className={style.form__label}>描述：（200字以内）</span>
              <textarea name="" id=""  className={style.form__textarea} value={this.state.detail} onChange={(e) => { this.inputChange(e, 'detail') }} placeholder={'请输入问题描述'} />
            </li>
            <li>
              <a href='javascript:;' className={style.form__btnmain} onClick={() => this.submitJudge()}>提交</a>
              <a href='javascript:;' className={style.form__btncancel} onClick={props.goBack}>取消</a>
            </li>
          </ul>
          <div className={`${style.form__pop} ${open ? style.show : ''}`}>
            <div className={style.form__popwrap}>
              <div className={style.form__popbody}>是否确认提交问题</div>
              <div className={style.form__popfoot}>
                <a href='javascript:;' className={style.form__btnmain} onClick={() => this.submit()}>提交</a>
                <a href='javascript:;' className={style.form__btncancel}  onClick={() => this.toggle(false)} >取消</a>
              </div>
            </div>
          </div>
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
)(myOrder)
