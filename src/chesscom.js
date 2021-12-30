import { useState, useEffect } from "react";
export function ChessComAPI(props) {
  const [monthlyArchives, setMonthlyArchives] = useState([]);
  // const BASEAPI = "https://api.chess.com/pub/player/monarkjain/games/archive"
  const BASEAPI = `https://api.chess.com/pub/player/${props.username}`;
  const monthlyArchiveURL = BASEAPI + "/games/archives";

  const fetchAllGames = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    const result = await Promise.all(
      json.archives.map(async (item) => {
        const res = await fetch(item);
        const data = await res.json();
        const games = await data.games;
        return games;
      })
    );
    return result;
  };

  useEffect(() => {
    const result = fetchAllGames(monthlyArchiveURL);
    console.log(result);
  }, [monthlyArchives]);
  return <></>;
}
