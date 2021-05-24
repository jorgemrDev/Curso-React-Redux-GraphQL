import axios from "axios";

//constants
let initialState = {
  fetching: false,
  charactersList: [],
  current: {},
};
let URL = "https://rickandmortyapi.com/api/character";
let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

let REMOVE_CHARACTER = "REMOVE_CHARACTER";
//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_CHARACTER:
      return { ...state, charactersList: action.payload };
    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, charactersList: action.payload, fetching: false };
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

//action (thunk)

export let removeCharacterAction = () => (dispatch, getState) => {
  let { charactersList } = getState().characters;
  charactersList.shift();
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...charactersList],
  });
};

export let getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });
  return axios
    .get(URL)
    .then((res) => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message,
      });
    });
};
