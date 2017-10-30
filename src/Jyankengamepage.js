import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class JyankenGamePage extends Component {

  constructor(props) {
    super(props)
    this.state = {human: null, computer: null }
  }

  // ⓪ブラウザロードの1秒後にponメソッドを実行
  componentDidMount() {
    setTimeout(() => {this.pon(Math.floor(Math.random() * 3))}, 1000)
  }

  // ③ユーザーの値を受けてPCの手0〜2の乱数を合わせてStateに登録
  pon(human_hand) {
    const computer_hand = Math.floor(Math.random() * 3)
    this.setState({human: human_hand, computer: computer_hand})
  }

  // ④勝敗を判定
  judge() {
    if (this.state.human == null) {
      // ユーザーの手がなければ判定結果に空を返す
      return null
    } else {
      // 分け0,勝ち1,負け2の結果を返す
      return (this.state.computer - this.state.human + 3) % 3
    }
  }
  // 前回と同じ手の場合、コンソールにIdentical(同一)と表示
  shouldComponentUpdate(nextProps, nextState) {
    const identical = nextState.human == this.state.human && nextState.computer == this.state.computer
    if (identical) {console.log("*Identical*")}
    return !identical
  }

  render () {
    return (
      <div>
        <h1>Propsジャンケン</h1>
        {/* ②下のコンポーネントからユーザーが押した0〜2の値を受けてPonメソッドに渡す */}
        <JyankenBox actionPon={(te) => this.pon(te)} />
        {/* ⑤ステートに登録されたユーザーとPCの手、判定結果の各0〜2の値をScoreBoxコンポーネントに渡す */}
        <ScoreBox human={this.state.human} computer={this.state.computer} judgement={this.judge()} /> 
      </div>
    )
  }
}

// ①ボタン表示
const JyankenBox = (props) => {
  return (
    <div>
      <button onClick={() => props.actionPon(0)}>グー</button>
      <button onClick={() => props.actionPon(1)}>チョキ</button>
      <button onClick={() => props.actionPon(2)}>パー</button>
    </div>
  )
}

JyankenBox.propTypes = {
  actionPon: PropTypes.func
}

// ⑥propsに各3種の値を取得した状態の結果表示用コンポーネント
const ScoreBox = (props) => {
  const teString = ["グー","チョキ","パー"]
  const judgementString = ["引き分け","勝ち","負け"]
  return (
    <table className="box">
      <tbody>
        {/* ⑦propsで受けた各0〜2の値を上記日本語の配列に変換 */}
        <tr><th>あなた</th><td>{teString[props.human]}</td></tr>
        <tr><th>Computer</th><td>{teString[props.computer]}</td></tr>
        <tr className="result"><th>勝敗</th><td>{judgementString[props.judgement]}</td></tr>
      </tbody>
    </table>
  )
}

ScoreBox.propTypes = {
  human: PropTypes.number,
  computer: PropTypes.number,
  judgement: PropTypes.number
}