import { createElement } from "../../lib"

const Input = (...props) => {
    return createElement('input', {...props})
}

export default Input