import * as actionTypes from "../action/actionType";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  rooms: null,
  error: null,
  addRoomLoading: false,
};

const fetchRoomStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchRoomSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    rooms: action.rooms,
    error: null,
  });
};

const fetchRoomFail = (state, action) => {
  console.log(action.error);
  return updateObject(state, {
    loading: false,
    rooms: null,
    error: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ROOMS_START:
      return fetchRoomStart(state, action);
    case actionTypes.FETCH_ROOMS_SUCCESS:
      return fetchRoomSuccess(state, action);
    case actionTypes.FETCH_ROOMS_FAIL:
      return fetchRoomFail(state, action);
    default:
      return state;
  }
};

export default reducer;
