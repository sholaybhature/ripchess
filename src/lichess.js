import React from 'react'
import * as Chess from 'chess.js'


const options = {
    method : 'GET',
    headers: new Headers({'accept': 'application/x-ndjson'}),
}

async function getGames() {
    let response = await fetch(`https://lichess.org/api/games/user/sp1nalcord?max=2`, options);
    let data = (await response.text()).match(/.+/g).map(JSON.parse);
    console.log(data);
}
getGames();
function Lichess() {
    return (
        <div>
            <h2>HELLO</h2>
        </div>
    )
}

export default Lichess;
