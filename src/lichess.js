import { processGame } from "./ripchess";
import ndjsonStream from "can-ndjson-stream";
import { chessPieces } from "./board";
const options = {
  method: "GET",
  headers: new Headers({ accept: "application/x-ndjson" }),
};

export const fetchLiChessCom = async () => {
  const t0 = performance.now();
  let response = await fetch(
    `https://lichess.org/api/games/user/sp1nalcord?max=7`,
    options
  );
  // let data = (await response.text()).match(/.+/g).map(JSON.parse);
  // for (let i = 0; i < data.length; i++) {
  // let game = data[i].moves;
  // let resGame = processGame(game);
  // Object.entries(resGame).forEach(([key, value]) => {
  // if (chessPieces[key][value]) {
  // chessPieces[key][value] += 1;
  // } else {
  // chessPieces[key][value] = 1;
  // }
  // });
  // }
  // Streaming the ndjson response
  const reader = ndjsonStream(response.body).getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    let game = value.moves;
    let resGame = processGame(game);
    // console.log(resGame);
    Object.entries(resGame).forEach(([key, value]) => {
      if (chessPieces[key][value]) {
        chessPieces[key][value] += 1;
      } else {
        chessPieces[key][value] = 1;
      }
    });
  }
  console.log(chessPieces);
  const t1 = performance.now();
  console.log(`It took ${t1 - t0} milliseconds`);
  // let data = (await response.text()).match(/.+/g).map(JSON.parse);
  // console.log(data);
  // var movesArray = data.map(obj => obj.moves);
  // for (let i=0; i<movesArray.length; i++) {
  //     movesArray[i] = [movesArray[i]];
  // }
  // console.log(movesArray);
  // passMoves(movesArray);
};
