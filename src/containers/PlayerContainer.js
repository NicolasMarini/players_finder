import Player from '../components/Player';
import * as playerAction from '../actions/playerAction';
import { connect } from 'react-redux';
import { isGetPlayersInProgress, getPositions, getPlayersFiltered } from '../reducers/playerReducer';

const mapStateToProps = state => {
  return {
    playersFiltered: getPlayersFiltered(state),
    isGetPlayersInProgress: isGetPlayersInProgress(state),
    positions: getPositions(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPlayers: () => dispatch(playerAction.getPlayers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
