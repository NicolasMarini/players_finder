import * as actionTypes from './ActionTypes';


export const getPlayersInProgress = () => {
  return {
    type: actionTypes.GET_PLAYERS_IN_PROGRESS
  }
};

export const getPlayersFailure = () => {
  return {
    type: actionTypes.GET_PLAYERS_FAILURE
  }
};

export const getPlayersSuccess = players => {
  return {
    type: actionTypes.GET_PLAYERS_SUCCESS,
    players: players
  }
};

/*
export const openErrorDialog = () => {
  return {
    type: actionTypes.OPEN_ERROR_DIALOG,
    openDialog: true,
    message: 'Ocurrió un error al intentar obtener el listado de jugadores'
  }
};
*/

export const findPlayersSuccess = players => {
  return {
    type: actionTypes.FIND_PLAYERS_SUCCESS,
    playersFiltered: players
  }
};

export const selectPosition = position => {
  return {
    type: actionTypes.SELECT_POSITION,
    position: position
  }
};

export const updateNameFilter = name => {
  return {
    type: actionTypes.UPDATE_NAME_FILTER,
    nameFilter: name
  }
};

export const updatePositionFilter = position => {
  return {
    type: actionTypes.UPDATE_POSITION_FILTER,
    positionFilter: position
  }
};

export const updateAgeFilter = age => {
  return {
    type: actionTypes.UPDATE_AGE_FILTER,
    ageFilter: age
  }
};

export const resetFilters = () => {
  return {
    type: actionTypes.RESET_FILTERS
  }
};

export const openErrorDialog = (shouldOpen, message) => {
  return {
    type: actionTypes.OPEN_ERROR_DIALOG,
    openDialog: shouldOpen,
    message: message
  }
};
