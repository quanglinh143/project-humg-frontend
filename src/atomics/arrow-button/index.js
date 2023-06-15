import React from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "icons"

import classes from "./ArrowButton.module.scss"
const ArrowButton = ({ onHandleNextSlide, onHandlePrevSlide }) => {
 const prevSlide = () => {
  onHandlePrevSlide()
 }

 const nextSlide = () => {
  onHandleNextSlide()
 }

 return (
  <div className={classes.container}>
   <button className={classes.button} onClick={prevSlide}>
    <ArrowLeftIcon />
   </button>
   <button className={classes.button} onClick={nextSlide}>
    <ArrowRightIcon />
   </button>
  </div>
 )
}

export default ArrowButton
