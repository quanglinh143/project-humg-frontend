import Instance from "services/instance.js"

export function getDataBrands() {
 return Instance.get("/api/brand")
}
