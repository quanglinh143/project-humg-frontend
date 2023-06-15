import Instance from "services/instance.js"

export function getPaymentById(idPayment, idUser, token) {
 return Instance.get(`/api/payment/${idPayment}?idUser=${idUser}`, {
  headers: { Authorization: token },
 })
}

export function orderStatusPayment(item, status) {
 return Instance.post(`/api/orderStatus`, { item, status })
}
