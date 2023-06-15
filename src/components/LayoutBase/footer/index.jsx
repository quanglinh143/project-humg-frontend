import React from "react"
import classes from "./Footer.module.scss"
import { FacebookIcon, LinkedinIcon, MessageIcon } from "icons"
const Footers = () => {
 return (
  <div className={classes.container}>
   <div className={classes.headFooter}>
    <div className={classes.headFooter_company}>
     <div className={classes.logo}>
      <img className={classes.logoHeader} src="/images/logoFooter.png" alt="" />
     </div>
     <div className={classes.headFooter_company_name}>
      CÔNG TY TNHH CHAMM VIỆT NAM Địa chỉ trụ sở chính:
     </div>
     <div className={classes.headFooter_company_address}>
      Số 14 - Bắc Từ Liêm - Hà Nội
     </div>
    </div>
    <div className={classes.headFooter_introduce}>
     <div className={classes.headFooter_introduce_title}>
      CHAMM - MỌI THỨ, MUA MỌI THỨ TẠI CHAMM
     </div>
     <ul>
      <li>MUA CÔNG NGHỆ CAO GIÁ TỐT TẠI CHAMM</li>
      <li>MUA HÀNG CHÍNH HÃNG TỪ CÁC THƯƠNG HIỆU LỚN CÙNG CHAMM</li>
      <li>MUA BÁN TRỰC TUYẾN ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN</li>
     </ul>
    </div>
    <div className={classes.headFooter_contact}>
     <div>Liên hệ: 039 4531691</div>
     <div>Email: quanglinh29l5@gmail.com</div>
    </div>
   </div>
   <div className={classes.policy}>
    <div>Bản quyền thuộc về Cham</div>
    <div className={classes.policy_icons}>
     <FacebookIcon />
     <LinkedinIcon />
     <MessageIcon />
    </div>
   </div>
  </div>
 )
}

export default Footers
