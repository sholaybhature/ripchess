import { useState, useEffect } from "react";
import pRetry from "p-retry";
import { processGame } from "./ripchess";
import { game1 } from "./testLogic";
import * as Chess from "chess.js";
import { chessPieces } from "./board";
export function ChessComAPI(props) {
  const [monthlyArchives, setMonthlyArchives] = useState([]);
  // const BASEAPI = "https://api.chess.com/pub/player/monarkjain/games/archive"
  const BASEAPI = `https://api.chess.com/pub/player/${props.username}`;
  const monthlyArchiveURL = BASEAPI + "/games/archives";
  // TODO: Better error handling
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
  useEffect(() => {
    const result = fetchAllGames(monthlyArchiveURL);
    console.log(result);
    // TODO: This creates a new chess instance everytime, bad code?
    result.then((res) => {
      var count = 0;
      res.forEach((item) => {
        console.log(item);
        if (item.status === "fulfilled") {
          // console.log(item, item.value);
          for (let i = 0; i < item.value.length; i++) {
            let game = item.value[i].pgn;
            let resGame = processGame(game);
            if (
              item.value[i].white.result == "checkmated" ||
              item.value[i].black.result == "checkmated"
            ) {
              count += 1;
            }
            Object.entries(resGame).forEach(([key, value]) => {
              if (chessPieces[key][value]) {
                chessPieces[key][value] += 1;
              } else {
                chessPieces[key][value] = 1;
              }
            });
            console.log(resGame);
          }
        }
      });
      console.log(chessPieces, count);
    });
  }, []);
  return <></>;
}
