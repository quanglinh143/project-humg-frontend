import Instance from "services/instance.js"

export function getDataDailyDiscover(userId, currentPage, limit) {
 return Instance.get(`/api/daily_discover?userId=${userId}`)
}
