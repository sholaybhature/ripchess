import { passMoves } from './ripchess'

const options = {
    method : 'GET',
    headers: new Headers({'accept': 'application/x-ndjson'}),
}

export const getGames = async () => {
    let response = await fetch(`https://lichess.org/api/games/user/sp1nalcord?max=7`, options);
    let data = (await response.text()).match(/.+/g).map(JSON.parse);
    var movesArray = data.map(obj => obj.moves);
    // for (let i=0; i<movesArray.length; i++) {
    //     movesArray[i] = [movesArray[i]];
    // }
    console.log(movesArray);
    passMoves(movesArray);
}
