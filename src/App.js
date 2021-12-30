import "./App.css";
import { ChessComAPI } from "./chesscom";
import { processPgn } from "./ripchess";
processPgn();
function App() {
  return (
    <div className="App">
      <ChessComAPI username="monarkjain" />
      <h1>ripchess</h1>
    </div>
  );
}

export default App;
