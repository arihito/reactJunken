import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.css'

{/* - - - - - - - - - - - - - - - Propsジャンケン - - - - - - - - - - - - - - - - */}

class JyankenGamePage extends Component {

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

{/* - - - - - - - - - - - - - - - mapテーブル - - - - - - - - - - - - - - - - */}

class MoneyBook extends Component {

  constructor(props) {
    super(props)
    this.state = {books: []}
  }

  componentDidMount() {
    this.setState({books: [
      {date: "1/1", item: "お年玉", amount: 10000},
      {date: "1/3", item: "ケーキ", amount: -500},
      {date: "2/1", item: "小遣い", amount: 3000},
      {date: "2/5", item: "マンガ", amount: -600}
    ]})
  }

  addBook(date, item, amount) {
    const book = {date: date, item: item, amount: amount}
    this.setState({books: this.state.books.concat(book)})
  }
  render () {
    return (
      <div>
        <Title>小遣い帳</Title>
        <MoneyBookList books={this.state.books} />
        <MoneyEntry add={(date, item, amount) => this.addBook(date, item, amount)} />
      </div>
    )
  }
}

class MoneyEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {date: '', item: '', amount: '', payingIn: true}
  }

  onChangeData(event) {
    this.setState({date: event.target.value})
  }
  onChangeItem(event) {
    this.setState({item: event.target.value})
  }
  onChangeAmount(event) {
    this.setState({amount: event.target.value})
  }
  onChangePayingIn(event) {
    this.setState({payingIn: event.target.value == "on"})
  }

  onClickSubmit() {
    this.props.add(this.state.date, this.state.item, this.state.amount * (this.state.payingIn ? 1 : -1))
    this.setState({date: '', item: '', amonut: '', payingIn: false})
  }

  render() {
    return (
      <div className="entry">
        <fieldset>
          <legend>記帳</legend>
          <div>
            <input type="radio" value="on" checked={this.state.payingIn} onChange={(event) => this.onChangePayingIn(event)} /> 入金
            <input type="radio" value="off" checked={!this.state.payingIn} onChange={(event) => this.onChangePayingIn(event)} />出金
          </div>
          <div>日付：<input type="text" value={this.state.date} onChange={(event) => this.onChangeData(event)} placeholder="3/15" /> </div>
          <div>項目：<input type="text" value={this.state.item} onChange={(event) => this.onChangeItem(event)} placeholder="お小遣い" /> </div>
          <div>金額：<input type="text" value={this.state.amount} onChange={(event) => this.onChangeAmount(event)} placeholder="1000" /> </div>
          <div><input type="submit" value="追加" onClick={() => this.onClickSubmit()} /></div>
        </fieldset>
      </div>
    )
  }
}

MoneyEntry.propTypes = {
  add: PropTypes.func.isRequired
}

const MoneyBookList = (props) => {
  return (
    <div>
      <table className="box">
        <thead date-type="ok">
          <tr className="result"><th>日付</th><th>項目</th><th>入金</th><th>出金</th></tr>
        </thead>
        <tbody>
          {props.books.map((book) => 
            <MoneyBookItem book={book} key={book.data + book.item} /> )}
        </tbody>
      </table>
    </div>
  )
}

MoneyBookList.propTypes = {
  books: PropTypes.array.isRequired
}

const MoneyBookItem = (props) => {
  const {date, item, amount} = props.book
    return (
      <tr>
        <td>{date}</td>
        <td>{item}</td>
        <td>{amount >= 0 ? amount : null}</td>
        <td>{amount < 0 ? amount : null}</td>
      </tr>
    )
}

MoneyBookItem.propTypes = {
  book: PropTypes.object.isRequired
}

const Title = (props) => {
  return (<h1>{props.children}</h1>)
}

Title.propTypes = {
  children: PropTypes.string
}

ReactDOM.render(
  <div>
    <JyankenGamePage />
    <MoneyBook />
  </div>,
  document.getElementById('root')
)