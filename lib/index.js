const nativeEvents = {
  onClick: 'click',
  onChange: 'input',
  onKeyPress: 'keypress',
}

const handleEvents = (element, props, propKey) =>
  element.addEventListener(nativeEvents[propKey], props[propKey])

export const render = (Component, domNode) => {
  domNode.appendChild(Component?.())
}

export const createElement = (type, props, children) => {
  const element = document.createElement(type)
  if (props) {
    Object.keys(props).forEach((propKey) => {
      if (nativeEvents[propKey]) {
        handleEvents(element, props, propKey)
        return
      }

      if (propKey === 'text-content') {
        element.textContent = props[propKey]
        return
      }
      element.setAttribute(propKey, props[propKey])
    })
  }

  if (children?.length > 0) {
    children.forEach((child) => element.appendChild(child))
  }
  return element
}

const FakeReact = {
    createElement,
    render
}

export default FakeReact