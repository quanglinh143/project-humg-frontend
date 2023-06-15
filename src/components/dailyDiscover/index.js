import React, { useContext, useEffect, useState } from "react"
import { openNotification } from "atomics/Notification"
import { getDataDailyDiscover } from "services/api-client/dailyDiscover"
import Related from "components/related"
import { GlobalState } from "GlobalState"

import classes from "./DailyDiscover.module.scss"

const DailyDiscover = () => {
 const values = useContext(GlobalState)
 const [dailyDiscover, setDailyDiscover] = useState([])
 const [idUser] = values.userApi.isIDUser

 const getDailyDiscover = async () => {
  try {
   const response = await getDataDailyDiscover(idUser)
   if (response.status === 200) {
    setDailyDiscover(response.data.result)
   }
  } catch (error) {
   openNotification("error", error.msg || "Đã có lỗi xảy ra")
  }
 }

 useEffect(() => {
  getDailyDiscover()
 }, [idUser])

 return (
  <div className={classes.container}>
   {dailyDiscover.length > 0 && (
    <Related
     data={dailyDiscover}
     text="Đề xuất hôm nay"
     description="Không có sản phẩm đề xuất hôm nay"
    />
   )}
  </div>
 )
}

export default DailyDiscover
