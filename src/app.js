import { createElement } from "../lib";

const App = () => createElement('div', {}, [
    createElement('input', {onChange: (e) => console.log('change ', e.target.value )})
])

export default App