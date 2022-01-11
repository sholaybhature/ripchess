import pRetry from "p-retry";
import { processGame } from "./ripchess";
import { chessDict, updateFinalPieces } from "./utility";

// Fetch monthly archives URL
const fetchMonthlyArchives = async (monthlyArchiveURL) => {
  let json;
  try {
    // If fetch fails, retry
    const res = await pRetry(() => fetch(monthlyArchiveURL), { retries: 3 });
    json = await res.json();
  } catch (err) {
    console.log("Error fetching monthly archives", err);
  }
  return json;
};

// Process each game from the monthly archives
export const fetchChessCom = async (username) => {
  let json, res;
  let monthlyArchiveURL = `https://api.chess.com/pub/player/${username}/games/archives`;
  let monthlyArchives = fetchMonthlyArchives(monthlyArchiveURL);
  // Dict to store captured pieces
  let d = chessDict();
  let links = await monthlyArchives;
  // Could do asynchronous requests here but chess.com recommends sequential
  // requests, otherwise it leads to 429 error.
  for (let item of links.archives) {
    try {
      let response = await pRetry(() => fetch(item), { retries: 3 });
      json = await response.json();
      for (let game of json.games) {
        // Can do better here?
        res = processGame(game.pgn);
        updateFinalPieces(res, d);
      }
      // TODO: Improve error handling
    } catch (err) {
      console.log("Error fetching games for a month", err);
    }
  }
  // Returns a promise, val can be accessed by .then()
  return d;
};
