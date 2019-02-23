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
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class Player extends Component {

  constructor() {
    super();
    this.state = {
      playerName: null,
      selectedPosition: ''
    },
    this.renderPositionItems = this.renderPositionItems.bind(this);
  }

  componentDidMount () {
    this.props.getPlayers();
    
  }

  renderPositionItems () {
    return this.props.positions.map(position => {
      console.log('POSITION VALUE: ', position);
      return(
        <MenuItem value={position}>
          <p>{position}</p>
        </MenuItem>
      )
    })
  }

  renderPlayerItems () {
    return this.props.players.map(position => {
      console.log('POSITION VALUE: ', position);
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
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    return (


      <Grid container spacing={24} md={10} alignContent='center' alignItems='space-around'>
        <Grid item md={12}>
          <Paper className={styles.paper}>Football Player Finder</Paper>
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField id="playerName" placeholder='Player Name' inputProps={{step: 300}} />
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField id="playerAge" type ='number' placeholder='Player Age'  />
        </Grid>
        <Grid item md={2} xs={6}>
          <Select value={this.state.selectedPosition}>
            {this.renderPositionItems()}
          </Select>
        </Grid>
        <Grid item md={2} xs={6}>
          <Button variant="contained" color="primary" className={styles.button}>
            Search
          </Button>
        </Grid>
        <Grid container md={12} xs={12}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Dessert (100g serving)</CustomTableCell>
                <CustomTableCell align="right">Calories</CustomTableCell>
                <CustomTableCell align="right">Fat (g)</CustomTableCell>
                <CustomTableCell align="right">Carbs (g)</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.players.map((row, index) => (
                <TableRow className={styles.row} key={row.id} key={index}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row.position}</CustomTableCell>
                  <CustomTableCell align="right">{row.dateOfBirth}</CustomTableCell>
                  <CustomTableCell align="right">{row.nationality}</CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid></Grid>
      </Grid>

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

export default Player;
