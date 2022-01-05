import "./App.css";
import { fetchChessCom } from "./chesscom";
import { fetchLichessCom } from "./lichess";
import Heatmap from './heatmap';
// import { fetchChessCom } from "./chesscom2";
// let username = "cjasnbckjanck";
let username = "monarkjain";
let username2 = "sp1nalcord";
// let res = fetchChessCom(username);
// let res = fetchLichessCom(username2);
// console.log(res);
// res.then((i) => console.log(i));
function App() {
  return (
    <div className="App">
      <h1>ripchess</h1>
      <Heatmap />
    </div>
  );
}

export default App;
