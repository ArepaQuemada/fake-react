const nativeEvents = {
  onClick: 'click',
  onChange: 'input',
  onKeyPress: 'keypress',
}

const handleEvents = (element, props, propKey) =>
  element.addEventListener(nativeEvents[propKey], props[propKey])

const FakeReact = (function() {
  let Component
  let stateValue
  
  const reRender = () => Component?.()

  return {
    render:  (_Component, domNode) => {
      Component = _Component
      domNode.appendChild(Component?.())
      Component = _Component
    },
    
    createElement: (type, props, ...children) => {
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
        children.forEach((child) => child && element.appendChild(child))
      }
      return element
    },

    useState: (initialState) => {
      stateValue = initialState 
      
      const state = () => stateValue
      
      const updateState = (value) => {
        if (value === state) {
          return
        }

        if (typeof value === 'function') {
          stateValue = value?.()
        } else {
          stateValue = value
        }
        reRender()
      }
      return  [state, updateState]
    }
  }
})()

const { render, useState, createElement } = FakeReact

export { render, useState, createElement }
export default FakeReact
