const nativeEvents = {
  onClick: 'click',
  onChange: 'input',
  onKeyPress: 'keypress',
}

const handleEvents = (element, props, propKey) =>
  element.addEventListener(nativeEvents[propKey], props[propKey])

const FakeReact = (function() {
  let Component
  let states = []
  let stateValue
  let FIRST_CALL_USE_STATE = true
  let domNode
  let stateKeys
  
  return {
    reRender: () => {
//      document.querySelector('div').childNodes()
//      document.querySelector('div').childNodes()
      domNode.removeChild(domNode.children[0])
      render(Component, domNode)
    },

    render:  (_Component, _domNode) => {

      Component = _Component
      domNode = _domNode

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
        })
      }
    
      if (children?.length > 0) {
        children.forEach((child) => child && element.appendChild(child))
      }

      return element
    },

    useState: (initialState) => {

      if (FIRST_CALL_USE_STATE) {
        stateValue = initialState 
        FIRST_CALL_USE_STATE = false
      }  

      const updateState = (value) => {
        if (typeof value === 'function') {
          stateValue = value?.()
        } else {
          stateValue = value
        }
        
        reRender()
      }

      const getState = () => stateValue

      return  [getState, updateState]
    }
  }
})()

const { render, useState, createElement, reRender} = FakeReact

export { render, useState, createElement, reRender }
export default FakeReact
