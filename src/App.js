import "./App.css";
import Lichess from "./lichess";
import { getGames } from "./chesscom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage.js";
import * as Chess from "chess.js";
import { processGame, checkCode } from "./ripchess";
import Navbar_rip from "./components/navbar";
import Heatmap from "./components/heatmap";

var ChessWebAPI = require("chess-web-api");

var chessAPI = new ChessWebAPI();

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar_rip />
        <Routes>
          {/* <Route exact path="/" element={<Navbar_rip />} /> */}
          <Route exact path="/homepage" element={<Homepage />} />
          <Route exact path="/heatmap" element={<Heatmap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
