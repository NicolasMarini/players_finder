import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../styles/styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayerFilterForm from '../containers/PlayerFilterFormContainer';
import * as utils from '../utils/utils';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ErrorDialog from '../containers/ErrorDialogContainer';



const styles = theme => ({
 
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  }
});


class Player extends Component {

  constructor() {
    super();
    this.state = {
      playerName: null,
      selectedPosition: ''
    },
    this.renderPositionItems = this.renderPositionItems.bind(this);
    this.renderPlayerItems = this.renderPlayerItems.bind(this);
  }

  componentDidMount () {
    this.props.getPlayers();   
  }

  renderPositionItems () {
    return this.props.positions.map((position, index) => {
      return(
        <MenuItem value={position} key={index}>
          <p>{position}</p>
        </MenuItem>
      )
    })
  }

  renderPlayerItems () {
    return this.props.players.map(position => {
      return(
        <Grid item md={12} xs={12}>
          <p>{position}</p>
        </Grid>
      )
    })
  }
  

  render() {
    const CustomTableCell = withStyles(theme => ({
      head: {
        backgroundColor: 'steelblue',
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    if(this.props.isGetPlayersInProgress) {
      return (
        <CircularProgress className='spinner' />
      )
    }

    return (
      <div className='pageContainer'>
        <ErrorDialog />
        <Grid alignItems="center"
        justify="center" container spacing={24}
          alignContent='center'>
          <Grid item md={10} sm={10} xs={12}>
            <AppBar className='noShadow' position="static" color="default" elevation='0.0'>
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  Football Player Finder
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item md={10} sm={10} xs={12}>
            <PlayerFilterForm />
          </Grid>
          <Grid item md={10} sm={10} xs={12}>
            <Table className='tablePlayers'>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Player</CustomTableCell>
                  <CustomTableCell align="right">Position</CustomTableCell>
                  <CustomTableCell align="right">Nationality</CustomTableCell>
                  <CustomTableCell align="right">Age</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.playersFiltered && this.props.playersFiltered.length > 0 ? 
                  this.props.playersFiltered.map((row, index) => (
                  <TableRow className={this.props.classes.row} key={index} >
                    <CustomTableCell component="th" scope="row"> {row.name}</CustomTableCell>
                    <CustomTableCell align="right">{row.position}</CustomTableCell>
                    <CustomTableCell align="right">{row.nationality}</CustomTableCell>
                    <CustomTableCell align="right">{utils.getAge(row.dateOfBirth)}</CustomTableCell>
                  </TableRow>
                )) :
                <div>
                  <p>No hay resultados para mostrar</p>
                </div>
              }
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>

/*
          <section>
            <TextField id="playerName" placeholder='Player Name' inputProps={{step: 300}} />
            <TextField id="playerAge" type ='number' placeholder='Player Age'  />
          </section>
          <Select value={this.state.selectedPosition}>
            {this.renderPositionItems()}
          </Select>
        </div>
        <p className="App-intro">
        </p>
      </div>
      */
    );
  }
}

export default withStyles(styles)(Player);
