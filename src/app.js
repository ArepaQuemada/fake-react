import { createElement, useState } from "../lib";
import Button from "./components/button";

const App = () => {
    return createElement('div', null, Button({'text-content': 'Increment'}))
}

export default App