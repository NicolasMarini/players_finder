import { createSelector } from 'reselect';

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
  isGetPlayersInProgress: false,
  positions: positions
};


// SELECTORS
const playersSelector = state => state.player.players;
const positionsSelector = state => state.player.positions;

export const getPlayers = createSelector([playersSelector], players => {
  return players;
});

export const getPositions = createSelector([positionsSelector], positions => {
  return positions;
});

export const isGetPlayersInProgress = state => state.player.isGetPlayersInProgress;

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYERS_IN_PROGRESS':
      return {
        ...state,
        isGetPlayersInProgress: true
      };
    case 'GET_PLAYERS_SUCCESS':
      return {
        ...state,
        players: action.players,
        isGetPlayersInProgress: false
      };
    case 'GET_PLAYERS_FAILURE':
      return {
        ...state,
        players: [],
        isGetPlayersInProgress: false
      };
    default: return state;
  }
};

export default playerReducer;
