import PlayerService from '../services/PlayerService';
import * as actionTypes from './ActionTypes';
import * as playerReducer from '../reducers/playerReducer';
import * as utils from '../utils/utils';


export const getPlayers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.GET_PLAYERS_IN_PROGRESS
      });
      let players = await PlayerService.getPlayers();
      dispatch(getPlayersSuccess(players.data));      
    }
    catch (err) {
      dispatch({
        type: actionTypes.GET_PLAYERS_FAILURE
      });
      dispatch({
        type: actionTypes.OPEN_ERROR_DIALOG,
        openDialog: true,
        message: 'Ocurrió un error al intentar obtener el listado de jugadores'
      });
    }
  };
};

const getPlayersSuccess = (players) => {
  return {
    type: actionTypes.GET_PLAYERS_SUCCESS,
    players: players
  };
};

export const findPlayers = (name, position, age) => {
  return async (dispatch, getState) => {
    let players = playerReducer.getPlayers(getState());
    if(name) {
      players = players.filter(player => {
        return player.name.includes(name);
      });
    }
    if(position) {
      players = players.filter(player => {
        return position === player.position;
      });
    }
    if(age) {
      players = players.filter(player => {
        return parseInt(age) === utils.getAge(player.dateOfBirth);
      });
    }

    dispatch(findPlayersSuccess(players));
  }
};

const findPlayersSuccess = (players) => {
  return {
    type: actionTypes.FIND_PLAYERS_SUCCESS,
    playersFiltered: players
  };
};

export const selectPosition = (position) => {
  return {
    type: actionTypes.SELECT_POSITION,
    position: position
  };
};

export const updateNameFilter = (name) => {
  return {
    type: actionTypes.UPDATE_NAME_FILTER,
    nameFilter: name
  };
};

export const updatePositionFilter = (position) => {
  return {
    type: actionTypes.UPDATE_POSITION_FILTER,
    positionFilter: position
  };
};

export const updateAgeFilter = (age) => {
  return {
    type: actionTypes.UPDATE_AGE_FILTER,
    ageFilter: age
  };
};

export const resetFilters = () => {
  return async (dispatch) => {
    dispatch({type: actionTypes.RESET_FILTERS});
    dispatch(findPlayers());
  }
};

export const openDialog = (bool, message) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.OPEN_ERROR_DIALOG,
      openDialog: bool,
      message: message
    });
  }
};
