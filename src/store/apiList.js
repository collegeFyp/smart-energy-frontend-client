// export const baseUrl = "https://smart-energy-project.herokuapp.com/";

export const baseUrl = "http://localhost:3000/";

export const loginUrl = baseUrl + "api/auth/login";
export const signInUrl = baseUrl + "api/auth/signup";
export const getRoom = baseUrl + "api/rooms/";
export const getDevice = baseUrl + "api/device/"; //include roo, id in url api/room/roomId
export const getUser = baseUrl + "api/user";
export const changeDeviceStatus = baseUrl + "api/switch/";
export const changeDeviceName = baseUrl + "api/device/"; // include deviceId at last
// delete requests
