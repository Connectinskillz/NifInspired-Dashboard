import React from 'react'

const Button = (props) => {
  return (
    <div>
        <button onClick={props.onClick} className={props.class} type={props.type} disabled={props.disable}>{props.name}</button>
    </div>
  )
}

export default Button

