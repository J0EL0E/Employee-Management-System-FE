import React from 'react'

const ThemedLabel = ({htmlFor, styling, children}) => {
  return (
    <label htmlFor={htmlFor} className={styling}>
        {children}
    </label>
  )
}

export default ThemedLabel