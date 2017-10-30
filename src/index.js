import React  from 'react'
import ReactDOM from 'react-dom'
import JyankenGamePage from './Jyankengamepage'
import JyankenMaterial from './Jyankenmaterial'
import MoneyBook from './Moneybook'

ReactDOM.render(
  <div>
    <JyankenGamePage />
    <JyankenMaterial />
    <MoneyBook />
  </div>,
  document.getElementById('root')
)