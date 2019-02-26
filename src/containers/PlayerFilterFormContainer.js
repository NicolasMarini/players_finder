import PlayerFilterForm from '../components/PlayerFilterForm';
import * as playerAction from '../actions/playerAction';
import { connect } from 'react-redux';
import { getPositions, getPlayerNameFilter, getPlayerPositionFilter, 
  getPlayerAgeFilter , getSelectedPosition
} from '../reducers/playerReducer';

const mapStateToProps = state => {
  return {
    positions: getPositions(state),
    playerNameFilter: getPlayerNameFilter(state),
    playerPositionFilter: getPlayerPositionFilter(state),
    playerAgeFilter: getPlayerAgeFilter(state)    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findPlayers: (name, position, age) => dispatch(playerAction.findPlayers(name, position, age)),
    selectPosition: (position) => dispatch(playerAction.updatePositionFilter(position)),
    updateNameFilter: (name) => dispatch(playerAction.updateNameFilter(name)),
    //updatePositionFilter: (position) => dispatch(playerAction.updatePositionFilter(position)),
    updateAgeFilter: (age) => dispatch(playerAction.updateAgeFilter(age)),
    resetFilters: () => dispatch(playerAction.resetFilters()),
    
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerFilterForm);
