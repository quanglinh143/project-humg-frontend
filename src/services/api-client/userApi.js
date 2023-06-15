import Instance from "services/instance.js"

export function resetPassword(values) {
 return Instance.post(
  "/user/changePassword",
  {
   id: values.id,
   oldPassword: values.newPassword.oldPassword,
   password: values.newPassword.password,
   rePassword: values.newPassword.rePassword,
  },
  {
   headers: { Authorization: values.token },
  }
 )
}
