import { createElement } from "../lib";
import Button from "./components/button";

const App = () => createElement('div', null, Button({'text-content': 'Boton'}))

export default App