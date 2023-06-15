import Instance from "services/instance.js"

export function getDataCategories() {
 return Instance.get("/api/category")
}
