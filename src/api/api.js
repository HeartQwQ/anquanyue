import service from "../utils/request"

// http://122.152.233.35:8000/getQRCode?agents=admin-test
export const getQRCode = agents => service.get("/getQRCode" + agents)

export const getLogin = token => service.get("/login?token=" + token)