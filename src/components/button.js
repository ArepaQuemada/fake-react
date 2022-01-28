import { createElement } from "../../lib"

const Button = (props) => {
    return createElement('button', {...props}, null)
}

export default Button