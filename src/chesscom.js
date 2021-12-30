 import { passMoves } from './ripchess'

    // const options = {
    //     method : 'GET',
    //     headers: new Headers({'accept': 'application/json'}),
    //     mode: 'no-cors'
    // }

    const options= {
        method:'GET',
        mode: 'cors',
        headers:{"Access-Control-Allow-Origin" : "https://web.postman.co/", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
}
const axios = require('axios');
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios({
    method: 'get',
    url: 'https://www.chess.com/callback/live/game/28911003455',
  })
    .then(function (response) {
      console.log(response);
    });
    
    export const getGames = async () => {
        let response = await fetch(`https://www.chess.com/callback/live/game/28911003455`, options);
        let data = await response.json();
        // var movesArray = data.map(obj => obj.moves);
        // for (let i=0; i<movesArray.length; i++) {
        //     movesArray[i] = [movesArray[i]];
        // }
        console.log(data);
        // passMoves(movesArray);
    }
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI();

chessAPI.getPlayerMonthlyArchives('monarkjain')
    .then(function(response) {
        console.log('Player Profile', response.body);
    }, function(err) {
        console.error(err);
    });
chessAPI.getPlayerCompleteMonthlyArchives('monarkjain',2021,10)
    .then(function(response) {
        console.log('Player Profile', response.body);
    }, function(err) {
        console.error(err);
    });

   