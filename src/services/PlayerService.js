import axios from 'axios';


export default class PlayerService {

  static getPlayers = () => {
    const url = 'https://football-players-b31f2.firebaseio.com/players.json';
    return axios.get(url);
  }
}