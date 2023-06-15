import Instance from "services/instance.js"

export function confirmCoupon(code, idUser, token) {
 return Instance.post(
  "/api/coupon_confirm",
  { code, idUser },
  {
   headers: { Authorization: token },
  }
 )
}
