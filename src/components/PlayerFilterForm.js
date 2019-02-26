import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  s: {backgroundColor:'red'}
});


class PlayerFilterForm extends Component {

  constructor() {
    super();
    this.state = {
      showNameError: false,
      showAgeError: false
    }
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
    var letters = /^[A-Za-z]+$/;

    if(name !== '' && !name.match(letters)) {
      this.setState({showNameError: true});
    } else {
      this.setState({showNameError: false});
    }
  }

  updatePositionFilter(position) {
    this.props.updatePositionFilter(position);
  }

  updateAgeFilter(age) {
    this.props.updateAgeFilter(age);
    if(age !== '' && (age < 18 || age > 40)) {
      this.setState({showAgeError: true});
    } else {
      this.setState({showAgeError: false});
    }
  }


  render() {
    return(
      <Grid container direction='row' spacing={24} className={styles.s}>
        <Grid item md={3} sm={3} xs={12}>
          <TextField id="playerName" placeholder='Player Name' fullWidth variant="outlined"
            inputProps={{step: 300}} value={this.props.playerNameFilter}
            onChange={event => this.updateNameFilter(event.target.value)} />
        </Grid>
        <Grid item md={2} sm={3} xs={12}>
          <TextField id="playerAge" type ='number' placeholder='Player Age' fullWidth variant="outlined"
            value={this.props.playerAgeFilter}
            onChange={event => this.updateAgeFilter(event.target.value)}
          />
        </Grid>
        <Grid item md={2} sm={3} xs={12}>
          <Select onChange={this.handlePositionChange}
          value={this.props.playerPositionFilter} displayEmpty
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name="age"
              id="outlined-age-simple"
            />
          }
          >
          <MenuItem value="" disabled>
          Position
          </MenuItem>
            {this.renderPositionItems()}
          </Select>
        </Grid>
        <Grid item md={3} sm={3} xs={12} direction='row' alignContent='space-between'>
        <Grid container direction='row' alignContent='space-between'>
        <Button size="small" variant="outlined" onClick={this.findPlayers} color="primary" className={styles.button}>
            Search
          </Button>
          <Button size="small" variant="outlined"  onClick={this.resetFilters} color="secondary" className={[styles.button, styles.removeFiltersButton]}>
            Reset Filters
          </Button>
        </Grid>
        </Grid>  
        <Grid item md={3} sm={3} xs={12}>
        { this.state.showNameError ?
          <p id="playerNameError"> Sólo se pueden ingresar letras </p>: null
        }
        </Grid>
        <Grid item md={3} sm={3} xs={12}>
        { this.state.showAgeError ?
          <p id="playerNameError"> Debe ser entre 18 y 40 </p>: null
        }
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(PlayerFilterForm);
