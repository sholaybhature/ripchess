import "./App.css";
import { Heatmap } from "./heatmap";
import { ParentSize } from "@visx/responsive";
function App() {
  return (
    <div className="App" style={{ height: "30vh", width: "15vw" }}>
      <ParentSize>
        {({ width, height }) => <Heatmap width={width} height={height} />}
      </ParentSize>
      <h1>ripchess</h1>
    </div>
  );
}

export default App;
