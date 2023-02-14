import {
  GET_GAMES,
  GET_BACKUP,
  BY_NAME,
  GET_GENRES,
  GET_PLATFORM,
  SEARCH_GAME,
  GET_ID,
  SET_PAGE,
  RESET_PAGE,
  GO_BACKUP_PAGE,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
  FILTER_BY_ABC,
  FILTER_CREATED,
  CLEAN_GAMES,
  CLEAN_DETAIL,
  FILTER_BY_GENRE_DETAIL,
} from "./actions";

const initialState = {
  games: [],
  gamesBackup: [],
  gamesFiltered: [],
  game: [],
  related: [],
  searchGames: null,
  copyOfPlatform: [],
  copyOfGenres: [],
  currentPage: 1,
  currentPageBackup: 1,
  pointer: 0,
};

export const searchVideoGame = (videoGames) => {
  const filtered = videoGames.filter((games) => games.name);
  return filtered;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, games: action.payload, gamesBackup: action.payload };

    case GET_BACKUP:
      return { ...state, games: state.gamesBackup };

    case BY_NAME:
      return { ...state, games: action.payload };

    case GET_ID:
      return { ...state, game: action.payload };

    case GET_GENRES:
      return { ...state, copyOfGenres: action.payload };

    case GET_PLATFORM:
      return { ...state, copyOfPlatform: action.payload };

    case SEARCH_GAME:
      return {
        ...state,
        searchGames: action.payload,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        currentPageBackup:
          action.gamesLength > 90 ? action.payload : state.currentPageBackup,
      };

    case RESET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case GO_BACKUP_PAGE:
      return {
        ...state,
        currentPage: state.currentPageBackup,
      };

    case FILTER_BY_GENRE:
      let source = action.payload;
      let toFilter = state.gamesBackup;
      let filtered = toFilter.filter((game) =>
        source.every((sourceGenre) => game.genres.includes(sourceGenre))
      );
      const result = filtered.length ? filtered : state.games;
      return {
        ...state,
        games: result,
        gamesFiltered: result,
        hasFilteredResults: filtered.length > 0,
      };

    case FILTER_BY_GENRE_DETAIL:
      let sourceDetail = action.payload;
      const filteredDetail = state.games.filter((game) => {
        return (
          sourceDetail.genres.every((sourceGenre) =>
            game.genres.includes(sourceGenre)
          ) && game.name !== sourceDetail.name
        );
      });
      const filteredCut = filteredDetail.slice(0, 4);
      return {
        ...state,
        related: filteredCut,
      };

    case FILTER_BY_RATING:
      if (action.payload === "all") {
        return { ...state, games: state.gamesFiltered };
      }
      let sorted2 =
        action.payload === "desc"
          ? [...state.games].sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            })
          : [...state.games].sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            });
      return { ...state, games: sorted2 };

    case FILTER_BY_ABC:
      if (action.payload === "all") {
        return { ...state, games: state.gamesFiltered };
      }
      let sorted =
        action.payload === "desc"
          ? [...state.games].sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            })
          : [...state.games].sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            });
      return { ...state, games: sorted };

    case FILTER_CREATED:
      let toFilter2 = state.gamesFiltered.length
        ? state.gamesFiltered
        : state.gamesBackup;
      let createdFilter =
        action.payload === "db"
          ? toFilter2.filter((g) => g.created)
          : toFilter2.filter((g) => !g.created);

      return {
        ...state,
        games:
          action.payload === "all"
            ? state.gamesFiltered
            : createdFilter.length
            ? createdFilter
            : state.gamesBackup,
        hasFilteredResults: createdFilter.length > 0,
      };

    case CLEAN_GAMES:
      return {
        ...state,
        games: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        game: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
