import { processGame } from "./ripchess";
import ndjsonStream from "can-ndjson-stream";
import { chessDict, updateFinalPieces } from "./utility";
import pRetry from "p-retry";
const options = {
  method: "GET",
  headers: new Headers({ accept: "application/x-ndjson" }),
};
// Fetch all games from Lichess
export const fetchLichessCom = async (username) => {
  // let fetchURL = `https://lichess.org/api/games/user/${username}?pgnInJson=true`;
  let res;
  // Dict to store captured pieces
  let d = chessDict();
  let fetchURL = `https://lichess.org/api/games/user/${username}?max=7`;
  let response = await pRetry(() => fetch(fetchURL, options), { retries: 3 });
  // Streaming the ndjson response
  const reader = ndjsonStream(response.body).getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    res = processGame(value.moves);
    updateFinalPieces(res, d);
  }
  return d;
};
