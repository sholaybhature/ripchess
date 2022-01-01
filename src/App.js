import "./App.css";
import { fetchChessCom } from "./chesscom";
import { fetchLiChessCom } from "./lichess";
// let username = "cjasnbckjanck";
let username = "monarkjain";
// let res = fetchChessCom(username);
// console.log(res);
let res = fetchLiChessCom();
function App() {
  return (
    <div className="App">
      <h1>ripchess</h1>
    </div>
  );
}

export default App;
