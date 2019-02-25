import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';



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


class PlayerFilterForm extends Component {

  constructor() {
    super();
    this.renderPositionItems = this.renderPositionItems.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.findPlayers = this.findPlayers.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.updateNameFilter = this.updateNameFilter.bind(this);
    this.updatePositionFilter = this.updatePositionFilter.bind(this);
    this.updateAgeFilter = this.updateAgeFilter.bind(this);
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

  handlePositionChange = event => {
    console.log('item selected: ', event.target.value);
    this.props.selectPosition(event.target.value);
  };

  findPlayers() {
    this.props.findPlayers(
      this.props.playerNameFilter,
      this.props.playerPositionFilter,
      this.props.playerAgeFilter
    )
  }

  resetFilters() {
    this.props.resetFilters();
  }

  updateNameFilter(name) {
    this.props.updateNameFilter(name);
  }

  updatePositionFilter(position) {
    this.props.updatePositionFilter(position);
  }

  updateAgeFilter(age) {
    this.props.updateAgeFilter(age);
  }

  render() {
    return(
      <Grid container direction='row' spacing={24} className='sa'>
        <Grid item md={4} xs={4}>
          <TextField id="playerName" placeholder='Player Name' 
            inputProps={{step: 300}} value={this.props.playerNameFilter}
            onChange={event => this.updateNameFilter(event.target.value)} />
        </Grid>
        <Grid item md={4} xs={4}>
          <TextField id="playerAge" type ='number' placeholder='Player Age'
            value={this.props.playerAgeFilter}
            onChange={event => this.updateAgeFilter(event.target.value)}
          />
        </Grid>
        <Grid item md={2} xs={2}>
          <Select onChange={this.handlePositionChange} 
          value={this.props.playerPositionFilter} displayEmpty
          >
          <MenuItem value="" disabled>
          Position
          </MenuItem>
            {this.renderPositionItems()}
          </Select>
        </Grid>
        <Grid item md={2} xs={2}>
          <Button onClick={this.findPlayers} variant="contained" color="primary" className={styles.button}>
            Search
          </Button>
          <Button onClick={this.resetFilters} variant="contained" color="secondary" className={styles.button}>
            Reset Filters
          </Button>
        </Grid>
        </Grid>
    )
  }
}

export default withStyles(styles)(PlayerFilterForm);
