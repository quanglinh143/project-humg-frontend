import React from "react"
import SideMenu from "components/sideMenu"
import Products from "components/products"
import classes from "./HomePageComponent.module.scss"

const HomePageComponent = () => {
 return (
  <div className={classes.container}>
   <div className={classes.sideMenu}>
    <SideMenu />
   </div>
   <div className={classes.content}>
    <Products />
   </div>
  </div>
 )
}

export default HomePageComponent
