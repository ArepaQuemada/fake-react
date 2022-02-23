import { createElement, useState } from '../lib'
import Button from './components/button'
import Input from './components/input'

const App = () => {
  const [state, setState] = useState(0)
  const [inputText, setInputText] = useState('')
  
  console.log(inputText())
  
  console.log('component state ', state())

  const increment = () => {
    setState(state() + 1)
  }

  return createElement(
    'div',
    null,
    Button({
      counter: state(),
      'text-content': 'Increment',
      onClick: increment,
    }),
    createElement('div', { 'text-content': state() }),
    createElement('div'),
  )
}

export default App
