import PlayerService from '../services/PlayerService';
import * as actionTypes from '../ActionTypes';
import * as playerReducer from '../reducers/playerReducer';
import * as utils from '../utils/utils';
import * as actionCreators from '../actionCreators';


export const getPlayers = () => {
  return async (dispatch) => {
    try {
      dispatch(actionCreators.getPlayersInProgress());
      let players = await PlayerService.getPlayers();
      dispatch(getPlayersSuccess(players.data));      
    }
    catch (err) {
      dispatch(actionCreators.getPlayersFailure());
      dispatch(actionCreators.openErrorDialog(true, `Ocurrió un 
                error al intentar obtener el listado de jugadores`));
    }
  };
};

const getPlayersSuccess = (players) => {
  return actionCreators.getPlayersSuccess(players);
};

export const findPlayers = (name, position, age) => {
  return async (dispatch, getState) => {
    let players = playerReducer.getPlayers(getState());
    if(name) {
      players = players.filter(player => {
        return player.name.toLowerCase().includes(name.toLowerCase());
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
  return actionCreators.findPlayersSuccess(players);
};

export const selectPosition = (position) => {
  return actionCreators.selectPosition(position);
};

export const updateNameFilter = (name) => {
  return actionCreators.updateNameFilter(name);
};

export const updatePositionFilter = (position) => {
  return actionCreators.updatePositionFilter(position);
};

export const updateAgeFilter = (age) => {
  return actionCreators.updateAgeFilter(age);
};

export const resetFilters = () => {
  return async (dispatch) => {
    dispatch(actionCreators.resetFilters());
    dispatch(findPlayers());
  }
};

export const openDialog = (bool, message) => {
  return async (dispatch) => {
    dispatch(actionCreators.openErrorDialog(bool, message));
  }
};
