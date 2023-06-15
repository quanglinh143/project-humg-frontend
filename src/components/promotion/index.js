import React from "react"
import { BoxIcon } from "icons"
import classes from "./Promotion.module.scss"

const Promotion = () => {
 return (
  <div className={classes.container}>
   <div className={classes.title}>
    <div className={classes.title_promotion}>
     <BoxIcon />
     <span className={classes.title_promotion_text}>Khuyến mãi</span>
    </div>
   </div>
   <div className={classes.content}>
    <div className={classes.content_title}>
     ✦ Giảm giá theo thứ hạng khách hàng
    </div>
    <ul className={classes.content_list}>
     <li className={classes.content_list_item}>
      - Giảm ngay <span>1%</span> khi khách hàng hạng bạc.
     </li>
     <li className={classes.content_list_item}>
      - Giảm ngay <span>3%</span> khi khách hàng hạng vàng.
     </li>
     <li className={classes.content_list_item}>
      - Giảm ngay <span>5%</span> khi khách hàng hạng bạch kim.
     </li>
     <li className={classes.content_list_item}>
      - Giảm ngay <span>10%</span> khi khách hàng hạng kim cương.
     </li>
    </ul>
   </div>
  </div>
 )
}

export default Promotion
