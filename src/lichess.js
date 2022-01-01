import { processGame } from "./ripchess";
import ndjsonStream from "can-ndjson-stream";
import { chessPieces } from "./board";
const options = {
  method: "GET",
  headers: new Headers({ accept: "application/x-ndjson" }),
};
// TODO: Add a util function for chessPieces.
export const fetchLiChessCom = async () => {
  var count = 0;
  const t0 = performance.now();
  let response = await fetch(
    // `https://lichess.org/api/games/user/sp1nalcord?pgnInJson=true`,
    `https://lichess.org/api/games/user/sp1nalcord?max=7`,
    options
  );
  // Streaming the ndjson response
  const reader = ndjsonStream(response.body).getReader();
  while (true) {
    const { value, done } = await reader.read();
    console.log(value);
    if (done) break;
    let game = value.moves;
    let resGame = processGame(game);
    count = count + 1;
    // console.log(resGame);
    Object.entries(resGame).forEach(([key, value]) => {
      if (chessPieces[key][value]) {
        chessPieces[key][value] += 1;
      } else {
        chessPieces[key][value] = 1;
      }
    });
  }
  const t1 = performance.now();
  console.log(`It took ${t1 - t0} milliseconds`);
  console.log(chessPieces, count);
};
