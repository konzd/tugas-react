import {
  FETCH_TRENDING_MOVIES,
  FETCH_GENRES,
  FETCH_MOVIES_BY_GENRE,
  SET_UPCOMING_MOVIES,
} from "../action/BerandaAction";

const initialState = {
  trendingMovies: [],
  genres: [],
  movies: [],
  selectedGenre: null,
  loading: false,
  upcomingMovies: [],
  error: null,
};

const berandaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRENDING_MOVIES:
      return { ...state, trendingMovies: action.payload };
    case FETCH_GENRES:
      return { ...state, genres: action.payload };
    case FETCH_MOVIES_BY_GENRE:
      return { ...state, movies: action.payload };
    case SET_UPCOMING_MOVIES:
      return { ...state, upcomingMovies: action.payload };
    case "SET_SELECTED_GENRE":
      return { ...state, selectedGenre: action.payload };
    case "TOGGLE_GENRE_DROPDOWN":
      return { ...state, showGenreDropdown: !state.showGenreDropdown };
    default:
      return state;
  }
};

export default berandaReducer;
