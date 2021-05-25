import { updateFavorites, getFavs } from "../firebase";
import ApolloClient, { gql } from "apollo-boost";

//constants
let initialState = {
  fetching: false,
  charactersList: [],
  current: {},
  favorites: [],
  nextPage: 1,
};
// let URL = "https://rickandmortyapi.com/api/character";

let apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
});

let UPDATE_PAGE = "UPDATE_PAGE";
let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

let REMOVE_CHARACTER = "REMOVE_CHARACTER";
let ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

let GET_FAVORITES = "GET_FAVORITES";
let GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS";
let GET_FAVORITES_ERROR = "GET_FAVORITES_ERROR";

//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, nextPage: action.payload };
    case GET_FAVORITES:
      return { ...state, fetching: true };
    case GET_FAVORITES_SUCCESS:
      return { ...state, fetching: false, favorites: action.payload };
    case GET_FAVORITES_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload };
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

export let getFavorites = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAVORITES,
  });
  let { uid } = getState().user;
  return getFavs(uid)
    .then((array) => {
      dispatch({
        type: GET_FAVORITES_SUCCESS,
        payload: [...array],
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: GET_FAVORITES_ERROR,
        payload: e.message,
      });
    });
};

export let addToFavoritesAction = () => (dispatch, getState) => {
  let { charactersList, favorites } = getState().characters;
  let { uid } = getState().user;
  let char = charactersList.shift();
  favorites.push(char);
  updateFavorites(favorites, uid);
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { charactersList: [...charactersList], favorites: [...favorites] },
  });
};

export let removeCharacterAction = () => (dispatch, getState) => {
  let { charactersList } = getState().characters;
  charactersList.shift();
  if (!charactersList.length) {
    getCharactersAction()(dispatch, getState);
    return;
  }
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...charactersList],
  });
};

export let getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });

  let query = gql`
    query($page: Int) {
      characters(page: $page) {
        info {
          pages
          next
          prev
        }
        results {
          name
          image
        }
      }
    }
  `;

  let { nextPage } = getState().characters;

  return apolloClient
    .query({
      query,
      variables: { page: nextPage },
    })
    .then(({ data, error }) => {
      if (error) {
        dispatch({
          type: GET_CHARACTERS_ERROR,
          payload: error,
        });
        return;
      }
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: data.characters.results,
      });

      dispatch({
        type: UPDATE_PAGE,
        payload: data.characters.info.next ? data.characters.info.next : 1,
      });
    });
  // dispatch({
  //   type: GET_CHARACTERS,
  // });
  // return axios
  //   .get(URL)
  //   .then((res) => {
  //     dispatch({
  //       type: GET_CHARACTERS_SUCCESS,
  //       payload: res.data.results,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: GET_CHARACTERS_ERROR,
  //       payload: err.response.message,
  //     });
  //   });
};
