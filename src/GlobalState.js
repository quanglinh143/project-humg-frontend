import React, { createContext, useEffect, useState } from "react"
import Instance from "services/instance.js"
import ProductsApi from "api/productsApi"
import UserApi from "api/userApi"
import CategoriesApi from "api/categoriesApi"
import ReviewsApi from "api/reviewsApi"
import SideMenuApi from "./api/sideMenuApi"
export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
 const [token, setToken] = useState("")
 const login = localStorage.getItem("login")
 useEffect(() => {
  if (login === "true") {
   const refreshToken = async () => {
    try {
     const token = await Instance.get("/user/refresh_token")
     setToken(token.data.accesstoken)
     setTimeout(() => {
      refreshToken()
     }, 30 * 60 * 1000)
    } catch (error) {
     //  window.location.href = "/login"
     console.log("error token", error)
    }
   }
   refreshToken()
  }
 }, [login])
 const state = {
  isToken: [token, setToken],
  productsApi: ProductsApi(),
  userApi: UserApi(token),
  categoriesApi: CategoriesApi(),
  reviewsApi: ReviewsApi(),
  sideMenuApi: SideMenuApi(),
 }
 return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
