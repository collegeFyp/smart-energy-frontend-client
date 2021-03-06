import * as actionType from "../action/actionType";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};
const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const authSuccess = (state, action) => {
  console.log(action.userId);
  return updateObject(state, {
    token: action.token,
    error: null,
    userId: action.userId,
    loading: false,
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const authLogout = (state, action) =>
  updateObject(state, {
    token: null,
    userId: null,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return authStart(state, action);
    case actionType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionType.AUTH_FAIL:
      return authFail(state, action);
    case actionType.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
