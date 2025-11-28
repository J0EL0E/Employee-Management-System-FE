import React from 'react'

const ThemedInput = ({id, type, value, form_name, styling, handlerFunc, placeholder}) => {
  return (
    <input
        id={id}
        type={type}
        value={value}
        name={form_name}
        className={styling}
        placeholder={placeholder}
        onChange={handlerFunc}
        style={{
            border: "solid black 2px"
        }}
    />
  )
}

export default ThemedInput;