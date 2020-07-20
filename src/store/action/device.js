import * as actionTypes from "./actionType";
import * as apiList from "../apiList";
import axios from "axios";

// ------------------------------------------
// fetch device
// ------------------------------------------

export const fetchDeviceStart = () => {
  return {
    type: actionTypes.FETCH_DEVICES_START,
  };
};

export const fetchDeviceSuccess = (devices) => {
  return {
    type: actionTypes.FETCH_DEVICES_SUCCESS,
    devices: devices,
  };
};

export const fetchDeviceFail = (error) => {
  return {
    type: actionTypes.FETCH_DEVICES_FAIL,
    error: error,
  };
};

export const fetchDevice = (token, userId, roomID) => {
  return (dispatch) => {
    dispatch(fetchDeviceStart());
    axios({
      method: "get",
      url: apiList.getDevice + roomID,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
    })
      .then((response) => {
        if (response.status === 500) {
          dispatch(fetchDeviceFail("Server Error! Status 500"));
        }
        if (response.status === 200) {
          dispatch(fetchDeviceSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(fetchDeviceFail(err));
      });
  };
};

// ------------------------------------------
// device toggle
// ------------------------------------------

export const toggleDeviceStart = () => {
  return {
    type: actionTypes.TOGGLE_DEVICE_START,
  };
};
export const toggleDeviceSuccess = (deviceId) => {
  return {
    type: actionTypes.TOGGLE_DEVICE_SUCCESS,
    deviceId: deviceId,
  };
};

export const toggleDeviceFail = (err) => {
  return {
    type: actionTypes.TOGGLE_DEVICE_FAIL,
    error: err,
  };
};

export const toggleDevice = (token, deviceId, userId) => {
  return (dispatch) => {
    dispatch(toggleDeviceStart());
    axios({
      method: "get",
      url: apiList.changeDeviceStatus + deviceId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("success");
          dispatch(toggleDeviceSuccess(deviceId));
        }
        if (response.data.err) {
          dispatch(toggleDeviceFail(response.data.err));
        }
      })
      .catch((err) => {
        dispatch(toggleDeviceFail(err));
      });
  };
};

// ------------------------------------------
// edit device
// ------------------------------------------

export const editDeviceStart = () => {
  return {
    type: actionTypes.EDIT_DEVICE_START,
  };
};

export const editDeviceSuccess = (device) => {
  return {
    type: actionTypes.EDIT_DEVICE_SUCCESS,
    device: device,
  };
};

export const editDeviceFail = (err) => {
  return {
    type: actionTypes.EDIT_DEVICE_FAIL,
    error: err,
  };
};

export const editDevice = (token, deviceId, deviceName) => {
  console.log("i am here");

  return (dispatch) => {
    console.log(apiList.changeDeviceName + deviceId);

    dispatch(editDeviceStart());
    axios({
      method: "put",
      url: apiList.changeDeviceName + deviceId,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
      data: {
        name: deviceName,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          dispatch(editDeviceSuccess(response.data));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(editDeviceFail(err));
      });
  };
};
