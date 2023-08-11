import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button type='submit' onClick={props.onClick} className={`px-[32px] py-[12px] border-[2px] mt-[50px] ${props.buttoncss}`} disabled={props.disabled}>{props.buttonName}</button>
    </div>
  )
}

export default Button
