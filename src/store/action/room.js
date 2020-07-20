import * as actionTypes from "./actionType";
import * as apiList from "../apiList";
import axios from "axios";

// ------------------------------------
// fetch Room
// ------------------------------------

// +++++++++++++++++
// Fetch Room Start
// +++++++++++++++++

export const fetchRoomStart = () => {
  return {
    type: actionTypes.FETCH_ROOMS_START,
  };
};
// +++++++++++++++++
// Fetch Rom Success
// +++++++++++++++++

export const fetchRoomSuccess = (rooms) => {
  return {
    type: actionTypes.FETCH_ROOMS_SUCCESS,
    rooms: rooms,
  };
};

// +++++++++++++++++
// fetchRoom Fail
// +++++++++++++++++

export const fetchRoomFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.FETCH_ROOMS_FAIL,
    error: error,
  };
};
// +++++++++++++++++
// Async function
// fetch rooms from web
// api call
// +++++++++++++++++

export const fetchRoom = (token) => {
  return (dispatch) => {
    dispatch(fetchRoomStart());
    axios({
      method: "get",
      url: apiList.getRoom,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + token,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data["err"]) {
            dispatch(fetchRoomSuccess([]));
          } else dispatch(fetchRoomSuccess(response.data));
        } else {
          dispatch(fetchRoomFail("Something went wrong"));
        }
      })
      .catch((err) => {
        dispatch(fetchRoomFail(err));
      });
  };
};

// ------------------------------------
// Edit Room
// ------------------------------------
export const editRoomStart = () => {
  return {
    type: actionTypes.EDIT_ROOM_START,
  };
};

export const editRoomSuccess = (room) => {
  return {
    type: actionTypes.EDIT_ROOM_SUCCESS,
    room: room,
  };
};

export const editRoomFail = (error) => {
  return {
    type: actionTypes.EDIT_ROOM_FAIL,
    error: error,
  };
};

export const editRoom = (token, roomName, roomId) => {};

// ------------------------------------
// EOF
// ------------------------------------
