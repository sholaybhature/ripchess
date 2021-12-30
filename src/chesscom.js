import { useState, useEffect } from "react";
export function ChessComAPI(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [monthlyArchives, setMonthlyArchives] = useState([]);
  const [gameArchives, setGameArchives] = useState([]);
  // const BASEAPI = "https://api.chess.com/pub/player/monarkjain/games/archive"
  const BASEAPI = `https://api.chess.com/pub/player/${props.username}`;
  const monthlyArchiveURL = BASEAPI + "/games/archives";
  const baseGamesArchiveURL = BASEAPI + "/games/";
  let promisesArr = [];
  const fetchMonthlyGames = async (arr) => {
    let promisesArrr = arr.map((item) => {
      return fetch(item)
        .then((res) => res.json())
        .then((res) => res.games);
    });
    console.log(promisesArrr);
    return await Promise.all(promisesArrr);
    // const r = fetch(baseGamesArchiveURL + "2020/07");
    // return await r.then((res) => res.json());
  };

  useEffect(() => {
    fetch(monthlyArchiveURL)
      .then((res) => res.json())
      .then(
        (result) => {
          setMonthlyArchives(result.archives);
        },
        (error) => {
          console.log("error in fetching monthlyArchives: ", error);
        }
      );
  }, []);
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
    // let games = fetchMonthlyGames(monthlyArchives);
    // console.log(games);
    // console.log(r.then((r) => console.log(r.games)));
    // fetch(baseGamesArchiveURL + "2020/07")
    // .then((res) => res.json())
    // .then(
    // (result) => {
    // setGameArchives(result);
    // },
    // (error) => {
    // console.log("error in fetching gameArchives: ", error);
    // }
    // );
  }, [monthlyArchives]);
  // console.log(monthlyArchives);
  // console.log(gameArchives);
  // fetchAllGames(monthlyArchiveURL);
  return <></>;
}
