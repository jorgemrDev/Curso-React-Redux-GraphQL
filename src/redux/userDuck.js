//constants
let initialState = {
  loggedIn: false,
};
let LOGIN = "LOGIN";
//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    default:
      return state;
  }
}

//action (action creator)
