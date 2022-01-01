import "./App.css";
import { fetchChessCom } from "./chesscom";
import { fetchLiChessCom } from "./lichess";
let username = "cjasnbckjanck";
// let res = fetchChessCom(username);
let res = fetchLiChessCom();
console.log(res);
function App() {
  return (
    <div className="App">
      <h1>ripchess</h1>
    </div>
  );
}

export default App;
