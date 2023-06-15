import React from "react"
import classes from "./Input.module.scss"

const Input = ({ name, value, customClass, onChange }) => {
 return (
  <input
   name={name}
   value={value}
   onChange={onChange}
   className={`${classes.custom} ${customClass ? customClass : ""}`}
  />
 )
}

export default Input
