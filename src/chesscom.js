import pRetry from "p-retry";
import { processGame } from "./ripchess";
import { chessPieces } from "./board";
// TODO: Better error handling
// Fetch all games from chess.com
const fetchAllGames = async (url) => {
  const res = await fetch(url);
  const json = await res.json();
  const result = await Promise.allSettled(
    json.archives.map(async (item) => {
      // HACK: If bunch requesting, chess.com returns CORS error
      // for a few requests, instead of sending sequential requests,
      // just try again.
      const res = await pRetry(() => fetch(item), { retries: 5 });
      const data = await res.json();
      const games = await data.games;
      return games;
    })
  );
  return result;
};
// TODO: data only for the playing side of the chess game
// Return data processed from chess.com
export async function fetchChessCom(username) {
  const t0 = performance.now();
  const BASEAPI = `https://api.chess.com/pub/player/${username}/games/archives`;
  // TODO: This creates a new chess instance everytime, bad code?
  const result = fetchAllGames(BASEAPI);
  result.then((res) => {
    res.forEach((item) => {
      console.log(item);
      if (item.status === "fulfilled") {
        for (let i = 0; i < item.value.length; i++) {
          let game = item.value[i].pgn;
          let resGame = processGame(game);
          Object.entries(resGame).forEach(([key, value]) => {
            if (chessPieces[key][value]) {
              chessPieces[key][value] += 1;
            } else {
              chessPieces[key][value] = 1;
            }
          });
        }
      }
    });
  });
  const les = await result;
  const t1 = performance.now();
  console.log(`It took ${t1 - t0} milliseconds`);
  return chessPieces;
}
