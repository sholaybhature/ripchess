import "./App.css";
import { Heatmap } from "./heatmap";
import { ParentSize } from "@visx/responsive";
import Search from "./components/search";
function App() {
  return (
    <div className="parent-container">
      <Search></Search>
    </div>
    // <ParentSize>
    // {({ width, height }) => <Heatmap width={width} height={height} />}
    // </ParentSize>
  );
}

export default App;
