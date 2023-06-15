import { useState, useEffect } from "react"
import Instance from "services/instance.js"
import { openNotification } from "atomics/Notification"

const UserApi = (token) => {
 const [isLogged, setIsLogged] = useState(false)
 const [cart, setCart] = useState([])
 const [history, setHistory] = useState([])
 const [user, setUser] = useState({})
 const [IDuser, setIDUser] = useState("")
 const [status, setStatus] = useState("")
 const [callback, setCallback] = useState(false)
 useEffect(() => {
  if (token) {
   const getUser = async () => {
    try {
     const response = await Instance.get("/user/info", {
      headers: { Authorization: token },
     })
     if (response.status === 200) {
      setIsLogged(true)
      setCart(response.data.cart)
      setUser(response.data)
      setIDUser(response.data._id)
     }
    } catch (error) {
     console.log(error || "Đã có lỗi xảy ra")
    }
   }
   getUser()
  }
 }, [token, callback, IDuser, status])

 useEffect(() => {
  if (token) {
   const getHistory = async () => {
    try {
     const res = await Instance.get("/user/history", {
      headers: { Authorization: token },
     })
     setHistory(res.data)
    } catch (error) {
     openNotification("error", error.msg || "Đã có lỗi xảy ra")
    }
   }
   getHistory()
  }
 }, [token, callback, status])

 const addToCart = async (product) => {
  if (!isLogged) return openNotification("warning", "Vui lòng đăng nhập!")
  const check = cart.every((item) => {
   return item._id !== product._id
  })

  if (check) {
   if (product.remaining === 0) {
    openNotification("warning", "Sản phẩm này hiện hết hàng.")
   } else {
    setCart([...cart, { ...product, qty: 1 }])
    await Instance.patch(
     "/user/addCart",
     { cart: [...cart, { ...product, qty: 1 }] },
     {
      headers: { Authorization: token },
     }
    )
    openNotification("success", "Thêm vào giỏ hàng thành công.")
   }
  } else {
   openNotification("warning", "Sản phẩm này đã có trong giỏ hàng!")
  }
 }
 return {
  isLogged: [isLogged, setIsLogged],
  isUser: [user, setUser],
  isIDUser: [IDuser, setIDUser],
  isCart: [cart, setCart],
  isHistory: [history, setHistory],
  isStatus: [status, setStatus],
  isCallback: [callback, setCallback],
  addToCart: addToCart,
 }
}

export default UserApi
