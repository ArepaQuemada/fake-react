import { createElement } from "../../lib"

const Button = ({counter, ...props}) => {
    return createElement('button', {...props}, null)
}

export default Button