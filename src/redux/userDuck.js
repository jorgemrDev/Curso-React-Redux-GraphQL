import { LoginWithGugul } from "../firebase";
//constants
let initialState = {
  loggedIn: false,
  fetching: false,
};
let LOGIN = "LOGIN";
let LOGIN_SUCCES = "LOGIN_SUCCES";
let LOGIN_ERROR = "LOGIN_ERROR";
//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCES:
      return { ...state, fetching: false, ...action.payload, loggedIn: true };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}

//action (action creator)
export let loginWithGugulAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  return LoginWithGugul()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCES,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState());
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message,
      });
    });
};
