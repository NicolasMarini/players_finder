import { createSelector } from 'reselect';
import * as actionTypes from '../actions/ActionTypes';

const positions = [
  'Attacking Midfield',
  'Central Midfield',
  'Centre-Back',
  'Centre-Forward',
  'Centre-Forward',
  'Defensive Midfield',
  'Keeper',
  'Left Midfield',
  'Left Wing',
  'Left-Back',
  'Right-Back'
];

const initialState = {
  players: [],
  playersFiltered: [],
  isGetPlayersInProgress: false,
  positions: positions,
  filters: {
    playerName: '',
    playerPosition: '',
    playerAge: '',
  },
  openErrorDialog: false,
  errorMessage: ''
};


// SELECTORS
const playersSelector = state => state.player.players;
const playersFilteredSelector = state => state.player.playersFiltered;
const positionsSelector = state => state.player.positions;
const positionSelectedSelector = state => state.player.selectedPosition;

// FILTERS SELECTORS
const playerNameSelector = state => state.player.filters.playerName;
const playerPositionSelector = state => state.player.filters.playerPosition;
const playerAgeSelector = state => state.player.filters.playerAge;

export const getPlayers = createSelector([playersSelector], players => {
  return players;
});

export const getPlayersFiltered = createSelector([playersFilteredSelector], players => {
  return players;
});

export const getPositions = createSelector([positionsSelector], positions => {
  return positions;
});

export const getPlayerNameFilter = createSelector([playerNameSelector], name => {
  return name;
});

export const getPlayerPositionFilter = createSelector([playerPositionSelector], position => {
  return position;
});

export const getPlayerAgeFilter = createSelector([playerAgeSelector], age => {
  return age;
});

export const getSelectedPosition = createSelector([positionSelectedSelector], position => {
  return position;
});

export const isGetPlayersInProgress = state => state.player.isGetPlayersInProgress;
export const openErrorDialog = state => state.player.openErrorDialog;
export const getErrorMessage = state => state.player.errorMessage;


const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYERS_IN_PROGRESS:
      return {
        ...state,
        isGetPlayersInProgress: true
      };
    case actionTypes.GET_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.players,
        isGetPlayersInProgress: false
      };
    case actionTypes.GET_PLAYERS_FAILURE:
      return {
        ...state,
        players: [],
        isGetPlayersInProgress: false
      };
    case actionTypes.FIND_PLAYERS_SUCCESS:
      return {
        ...state,
        playersFiltered: action.playersFiltered
      };
    case actionTypes.SELECT_POSITION:
      return {
        ...state,
        selectedPosition: action.position
      };
    case actionTypes.UPDATE_NAME_FILTER:
      return Object.assign({}, state, {
        ...state,
        filters: {
          ...state.filters,
          playerName: action.nameFilter
        }
      });
    case actionTypes.UPDATE_POSITION_FILTER:
      return Object.assign({}, state, {
        ...state,
        filters: {
          ...state.filters,
          playerPosition: action.positionFilter
        }
      });
    case actionTypes.UPDATE_AGE_FILTER:
      return Object.assign({}, state, {
        ...state,
        filters: {
          ...state.filters,
          playerAge: action.ageFilter
        }
      });
    case actionTypes.RESET_FILTERS:
      return Object.assign({}, state, {
        ...state,
        filters: {
          playerName: '',
          playerPosition: '',
          playerAge: ''
        }
      });
    case actionTypes.OPEN_ERROR_DIALOG:
      return {
        ...state,
        openErrorDialog: action.openDialog,
        errorMessage: action.message
      };
    default: return state;
  }
};

export default playerReducer;
