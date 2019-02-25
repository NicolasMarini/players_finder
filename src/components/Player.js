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


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  progress: {
    margin: theme.spacing.unit * 2,
    backgroundColor: 'red'
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
    this.findPlayers = this.findPlayers.bind(this);
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
  
  

  findPlayers() {
    this.props.findPlayers();
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
        <CircularProgress className='CSSDemo' />
      )
    }

    return (
      <div>
        <Grid alignItems="center"
        justify="center" container spacing={24}
          alignContent='center'>
          <Grid item md={10}>
            <Paper className={styles.paper}>Football Player Finder</Paper>
          </Grid>
          <Grid item md={10}>
              <PlayerFilterForm />
          </Grid>
          
          <Grid container>
            <Table className='tablePlayers'>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Player</CustomTableCell>
                  <CustomTableCell align="right">Position</CustomTableCell>
                  <CustomTableCell align="right">Team</CustomTableCell>
                  <CustomTableCell align="right">Age</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.playersFiltered.map((row, index) => (
                  <TableRow className={this.props.classes.row} key={index} >
                    <CustomTableCell component="th" scope="row">
                      {row.name}
                    </CustomTableCell>
                    <CustomTableCell align="right">{row.position}</CustomTableCell>
                    <CustomTableCell align="right">{row.dateOfBirth}</CustomTableCell>
                    <CustomTableCell align="right">{utils.getAge(row.dateOfBirth)}</CustomTableCell>
                  </TableRow>
                ))}
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
