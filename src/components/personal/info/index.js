import React, { useContext, useEffect, useState } from "react"
import { DatePicker, Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { openNotification } from "atomics/Notification"
import Instance from "services/instance"
import Loading from "utils/Loading"
import moment from "moment"
import { GlobalState } from "GlobalState"
import classes from "./InfoPerson.module.scss"

const InfoPerson = () => {
 const values = useContext(GlobalState)
 const [user] = values.userApi.isUser
 const [callback, setCallback] = values.userApi.isCallback
 const [token] = values.isToken
 const [initialState, setInitialState] = useState({})
 useEffect(() => {
  setInfoUser({
   id: user?._id,
   name: user?.name,
   avatar: user?.avatar,
   phone_number: user?.phone_number,
   date_of_birth: user?.date_of_birth,
   address: user?.address,
   gender: user?.gender,
  })
 }, [user])
 const [infoUser, setInfoUser] = useState(initialState)
 const [loading, setLoading] = useState(false)
 const [imageProduct, setImageProduct] = useState({})
 const [updateInfo, setUpdateInfo] = useState(false)
 const handleChangeInfo = (event) => {
  const { name, value } = event.target

  if (!imageProduct) {
   setInfoUser({ ...initialState, [name]: value })
  } else {
   setInfoUser({ ...initialState, [name]: value, avatar: infoUser?.avatar })
  }
 }

 const handleUploadImg = async (event) => {
  event.persist()
  try {
   const file = event.target.files[0]
   if (!file) openNotification("warning", "Dữ không tồn tại.")
   if (file.size > 1024 * 1024) openNotification("warning", "Dữ liệu quá lớn.")
   if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/jpg"
   )
    openNotification("warning", "Dữ liệu không đúng!")

   let formData = new FormData()
   formData.append("file", file)
   setLoading(true)

   const res = await Instance.post("/api/upload", formData, {
    headers: { "content-type": "multipart/form-data", Authorization: token },
   })
   if (res.status === 200) {
    event.target.value = null
   }
   setImageProduct(res.data)
   setInfoUser({ ...infoUser, avatar: res.data })
  } catch (error) {
   setLoading(false)
   openNotification("error", "Đã có lỗi xảy ra")
  }
  setLoading(false)
 }
 const handleSubmit = async (event) => {
  event.preventDefault()
  try {
   if (imageProduct) {
    const res = await Instance.post(
     "/user/updateInfo",
     { ...infoUser, id: user?._id, avatar: imageProduct },
     {
      headers: { Authorization: token },
     }
    )
    if (res.status === 200) {
     openNotification("success", "Cập nhật thành công")
     setCallback(!callback)
    }
   } else {
    const res = await Instance.post(
     "/user/updateInfo",
     { ...infoUser, id: user?._id },
     {
      headers: { Authorization: token },
     }
    )
    if (res.status === 200) {
     openNotification("success", "Cập nhật thành công")
     setCallback(!callback)
    }
   }
  } catch (error) {
   openNotification("error", error.msg)
  }
 }
 function onChangeBirth(date, dateString) {
  setInfoUser({ ...initialState, date_of_birth: dateString })
 }

 const handleCancelUpdate = () => {
  setUpdateInfo(false)
  setInfoUser({
   id: user?._id,
   name: user?.name,
   avatar: user?.avatar,
   phone_number: user?.phone_number,
   date_of_birth: user?.date_of_birth,
   address: user?.address,
   gender: user?.gender,
  })
 }
 return (
  <div className={classes.container}>
   <form className={classes.form} onSubmit={handleSubmit}>
    <div className={classes.personal}>
     <div className={classes.box}>
      <div className={classes.boxItem}>
       <div className={classes.title}>Tên người dùng:</div>
       <div className={classes.content}>{user?.name}</div>
       {updateInfo && (
        <input
         name="name"
         value={infoUser.name}
         onChange={handleChangeInfo}
         className={classes.input}
        />
       )}
      </div>
     </div>

     <div className={classes.box}>
      <div className={classes.boxItem}>
       <div className={classes.title}>Email:</div>
       {user?.email && (
        <div className={classes.content}>
         {user?.email}{" "}
         <span className={classes.activatedEmail}>(Activated)</span>
        </div>
       )}
      </div>
     </div>

     <div className={classes.box}>
      <div className={classes.boxItem}>
       <div className={classes.title}>Số điện thoại:</div>
       <div className={classes.content}>{user?.phone_number}</div>
       {updateInfo && (
        <input
         name="phone_number"
         value={infoUser.phone_number}
         onChange={handleChangeInfo}
         className={classes.input}
        />
       )}
      </div>
     </div>

     <div className={classes.box}>
      <div className={classes.boxItem}>
       <div className={classes.title}>Date of birth:</div>
       <div className={classes.content}>
        {user.date_of_birth
         ? moment(user?.date_of_birth).format("DD/MM/YYYY")
         : "Add your date of birth"}
       </div>
       {updateInfo && (
        <DatePicker
         name="gender"
         className={classes.input}
         onChange={(date, dateString) => onChangeBirth(date, dateString)}
        />
       )}
      </div>
     </div>

     <div className={classes.box}>
      <div className={classes.boxItem}>
       <div className={classes.title}>Giói tính:</div>
       <div className={classes.content}>
        {user?.gender === "0" && "Male"}
        {user?.gender === "1" && "Female"}
        {user?.gender === "2" && "Other"}
       </div>
       {updateInfo && (
        <select
         className={classes.selectGender}
         name="gender"
         value={infoUser.gender}
         onChange={handleChangeInfo}
         defaultValue={infoUser.gender | ""}
        >
         <option value="">Vui lòng chọn giới tính</option>
         <option value="0">Nam</option>
         <option value="1">Nữ</option>
         <option value="2">Khác</option>
        </select>
       )}
      </div>
     </div>

     <div className={classes.box}>
      <div className={classes.boxItem}>
       <div className={classes.title}>Address:</div>
       <div className={classes.content}>
        {user.address ? user.address : "Add your address"}
       </div>
       {updateInfo && (
        <input
         value={infoUser.address}
         name="address"
         onChange={handleChangeInfo}
         className={classes.input}
        />
       )}
      </div>
     </div>
    </div>

    <div className={classes.rightInfo}>
     <div className={classes.avatar}>
      <div className={classes.avatarBox}>
       <input
        type="file"
        id="uploadImg"
        onChange={handleUploadImg}
        className={classes.uploadImg}
       />
       <div className={classes.avatar_img}>
        {infoUser && infoUser.avatar ? (
         loading ? (
          <Loading />
         ) : (
          <img
           src={infoUser.avatar.url}
           alt={infoUser.avatar.url}
           className={classes.avatarHeader}
          />
         )
        ) : (
         <Avatar size={82} icon={<UserOutlined />} />
        )}
       </div>

       {updateInfo && (
        <label className={classes.avatar_upload} htmlFor="uploadImg">
         Chọn ảnh
        </label>
       )}
      </div>
     </div>
     {updateInfo ? (
      <div className={classes.updateInfoBtn}>
       <div
        className={classes.updateInfoBtn_cancel}
        onClick={handleCancelUpdate}
       >
        Hủy
       </div>
       <button
        type="submit"
        className={classes.updateInfoBtn_submit}
        disabled={loading}
       >
        Cập nhật
       </button>
      </div>
     ) : (
      <div className={classes.updateBtn} onClick={() => setUpdateInfo(true)}>
       Cập nhật thông tin
      </div>
     )}
    </div>
   </form>
  </div>
 )
}

export default InfoPerson
