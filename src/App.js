import "./App.css";
import Lichess from "./lichess";
import { getGames } from "./chesscom";

import * as Chess from "chess.js"
import {processGame, checkCode} from './ripchess'
// processGame("e3 e5 Nf3 Nc6 Bc4 d5 Bb3 Be6 c4 Nf6 cxd5 Bxd5 Bxd5 Nxd5 d4 e4 Ne5 Nxe5 dxe5 Qg5 Qa4+ c6 b4 Nxb4 Qxb4 Bxb4+")
//checkCode()
// getGames();
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI();

const options = {
    method : 'GET',
    headers: new Headers({'accept': 'application/json'}),
}
getGames();
// chessAPI.getPlayerMonthlyArchives('monarkjain')
//     .then(function(response) {
//         console.log('Player Profile', response.body);
//     }, function(err) {
//         console.error(err);
//     });
// chessAPI.getPlayerCompleteMonthlyArchives('monarkjain',2021,10,options)
//     .then(function(response) {
//         console.log('Player Profile', response.body);
//     }, function(err) {
//         console.error(err);
//     });
// chessAPI.getGameByID('28911003455',options)
//     .then(function(response) {
//         console.log('Player Profile', response.body);
//     }, function(err) {
//         console.error(err);
//     });
function App() {
    return <div className="App">
        <h1>ripchess</h1>
    </div>;
}

export default App;
