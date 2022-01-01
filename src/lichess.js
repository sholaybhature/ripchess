import { processGame } from "./ripchess";
import ndjsonStream from "can-ndjson-stream";
import { chessPieces } from "./board";
const options = {
  method: "GET",
  headers: new Headers({ accept: "application/x-ndjson" }),
};
// TODO: Fetch all games, instead of just 30.
export const fetchLiChessCom = async () => {
  let response = await fetch(
    `https://lichess.org/api/games/user/sp1nalcord?max=7`,
    options
  );
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
};
