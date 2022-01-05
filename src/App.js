import "./App.css";
import { fetchChessCom } from "./chesscom";
import Search from "./components/search";
import { fetchLichessCom } from "./lichess";

// import { fetchChessCom } from "./chesscom2";
// let username = "cjasnbckjanck";
let username = "monarkjain";
let username2 = "sp1nalcord";
// let res = fetchChessCom(username);
// let res = fetchLichessCom(username2);
// res.then((i) => console.log(i));
function App() {
  return (
    <div className="parent-container">
      <Search></Search>
    </div>
  );
}

export default App;
