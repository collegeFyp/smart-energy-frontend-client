import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  devices: null,
  error: false,
};

//  fetch device
// -----------------------------------------------

const fetchDeviceStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchDeviceSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    devices: action.devices,
    error: null,
  });
};

const fetchDeviceFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    devices: null,
    error: action.error,
  });
};
// ----------------------------------------------------
// toggle device status
// ----------------------------------------------------
const toggleDeviceStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const toggleDeviceSuccess = (state, action) => {
  const newDevice = [...state.devices];
  for (let i in newDevice) {
    if (newDevice[i]._id === action.deviceId) {
      newDevice[i].status = !newDevice[i].status;
    }
  }
  return updateObject(state, {
    loading: false,
    devices: newDevice,
  });
};
const toggleDeviceFail = (state, action) => {
  console.log(state);
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// -------------------------------------------------
// editDevice
// -------------------------------------------------

const editDeviceStart = (state, action) => {
  console.log("yes");
  return updateObject(state, { loading: true });
};
const editDeviceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const editDeviceSuccess = (state, action) => {
  let newDevices = [...state.devices];
  newDevices = newDevices.map((device) => {
    if (device._id === action.device._id) {
      device.name = action.device.name;
    }
    return device;
  });
  return updateObject(state, {
    devices: newDevices,
    loading: false,
  });
};

// --------------------------------------------------
// error
// --------------------------------------------------

// --------------------------------------------------
// reducer
// -------------------------------------------------

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEVICES_START:
      return fetchDeviceStart(state, action);
    case actionTypes.FETCH_DEVICES_FAIL:
      return fetchDeviceFail(state, action);
    case actionTypes.FETCH_DEVICES_SUCCESS:
      return fetchDeviceSuccess(state, action);
    case actionTypes.TOGGLE_DEVICE_START:
      return toggleDeviceStart(state, action);
    case actionTypes.TOGGLE_DEVICE_SUCCESS:
      return toggleDeviceSuccess(state, action);
    case actionTypes.TOGGLE_DEVICE_FAIL:
      return toggleDeviceFail(state, action);
    case actionTypes.EDIT_DEVICE_START:
      return editDeviceStart(state, action);
    case actionTypes.EDIT_DEVICE_SUCCESS:
      return editDeviceSuccess(state, action);
    case actionTypes.EDIT_DEVICE_FAIL:
      return editDeviceFail(state, action);

    default:
      return state;
  }
};

export default reducer;
