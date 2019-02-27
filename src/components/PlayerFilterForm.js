import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';



class PlayerFilterForm extends Component {

  constructor() {
    super();
    this.state = {
      showNameError: false,
      showAgeError: false,
      showInvalidAgeError: false
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
    this.setState({showNameError: false});
    this.setState({showAgeError: false});
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
    let pattern = /^[0-9]*$/;
    this.props.updateAgeFilter(age);
    if(age.length > 0) {
      if(age.match(pattern)) {
        this.setState({showInvalidAgeError: false});
        if(age !== '' && (age < 18 || age > 40)) {
          this.setState({showAgeError: true})
        } else {
          this.setState({showAgeError: false});
        }
      } else { this.setState({showInvalidAgeError: true}); }
    } else { 
      this.setState({showAgeError: false}); 
      this.setState({showInvalidAgeError: false}); 
    }
  }


  render() {
    return(
      <Grid container direction='row' spacing={16}>
        <Grid item md={3} sm={3} xs={12}>
          <TextField id="playerName" placeholder='Player Name' fullWidth variant="outlined"
            inputProps={{step: 300}} value={this.props.playerNameFilter}
            onChange={event => this.updateNameFilter(event.target.value)} />
            { this.state.showNameError ?
              <p id="playerNameError"> Sólo se pueden ingresar letras </p>: null
            }
        </Grid>
        <Grid item md={2} sm={2} xs={12}>
          <TextField id="playerAge" type ='text' placeholder='Age' fullWidth variant="outlined"
            value={this.props.playerAgeFilter}
            onChange={event => this.updateAgeFilter(event.target.value)}
          />
          { this.state.showAgeError ?
            <p id="playerNameError"> Debe ser entre 18 y 40 </p>: null
          }
          { this.state.showInvalidAgeError ?
            <p id="playerNameError"> Edad no válida </p>: null
          }
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
        <Grid item md={4} sm={4} xs={12}>
          <Grid container>
          <Button size="small" variant="outlined" onClick={this.findPlayers} color="primary">
              Search
            </Button>
            <div className='left'>
            <Button size="small" variant="outlined"  onClick={this.resetFilters} color="secondary">
              Reset Filters
            </Button>
            </div>
          </Grid>
        </Grid>  
      </Grid>
    )
  }
}

export default (PlayerFilterForm);
