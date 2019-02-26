import { errorMessage } from './../reducers/playerReducer';
import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


class ErrorDialog extends React.Component {

constructor() {
  super();
  this.handleOpenDialog = this.handleOpenDialog.bind(this);
}

handleOpenDialog () {
  this.props.openDialog(false);
}

  render() {
    return (
      <Dialog  aria-labelledby="simple-dialog-title" open={this.props.openErrorDialog} onOPEN_ERROR_DIALOG={this.handleOpenDialog}>
        <DialogTitle id="simple-dialog-title">Ocurrió un error</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" autoFocus onClick={this.handleOpenDialog}>
              Ok
            </Button>
          </DialogActions>
      </Dialog>
    )
  }
}


export default ErrorDialog;