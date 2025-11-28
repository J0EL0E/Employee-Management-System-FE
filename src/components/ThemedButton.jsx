import React from 'react'

const ThemedButton = ({styling, type, handlerFunc, children}) => {
  return (
    <button className={styling} type={type} onClick={handlerFunc}>
        {children}
    </button>
  )
}

export default ThemedButton