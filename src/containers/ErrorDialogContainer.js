import ErrorDialog from '../components/ErrorDialog';
import * as playerAction from '../actions/playerAction';
import { connect } from 'react-redux';
import { openErrorDialog, getErrorMessage } from '../reducers/playerReducer';

const mapStateToProps = state => {
  return {
    openErrorDialog: openErrorDialog(state),
    errorMessage: getErrorMessage(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: (bool) => dispatch(playerAction.openDialog(bool))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog);
