import PlayerService from '../services/PlayerService';

export const getPlayers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'GET_PLAYERS_IN_PROGRESS'
      });
      let players = await PlayerService.getPlayers();
      dispatch(getPlayersSuccess(players.data));
    }
    catch (err) {
      dispatch({
        type: 'GET_PLAYERS_FAILURE'
      });
    }
  };
}

const getPlayersSuccess = (players) => {
  console.log('EN SUCCESS');
  return {
    type: 'GET_PLAYERS_SUCCESS',
    players: players
  };
}