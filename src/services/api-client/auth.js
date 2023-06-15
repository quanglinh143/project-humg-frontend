import InstanceWithFormData from "services/instanceWithFormData"

export function loginApi(values) {
 const { email, password } = values
 const formData = new FormData()
 formData.append("email", email)
 formData.append("password", password)
 return InstanceWithFormData(formData, "/user/login")
}
export function registerApi(values) {
 const { name, email, password } = values
 const formData = new FormData()
 formData.append("name", name)
 formData.append("email", email)
 formData.append("password", password)
 return InstanceWithFormData(formData, "/user/register")
}
