import React, { useEffect, useState } from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { fetchLichessCom } from "./lichess";
import { fetchChessCom } from "./chesscom";

const binSize = 50;
const cool1 = "#20002c";
const cool2 = "#cbb4d4";

let mockData = function () {
  let d = [];
  for (let i = 0; i < 8; i++) {
    d.push({
      bin: i,
      bins: [],
    });
    for (let j = 0; j < 8; j++) {
      d[i].bins.push({
        bin: j * binSize,
        count: binSize * Math.random(),
      });
    }
  }
  return d;
};

let data = mockData();
// let data =

console.log("Data: ", data);

function max(data, value) {
  return Math.max(...data.map(value));
}
function min(data, value) {
  return Math.min(...data.map(value));
}

const bins = (d) => d.bins;
const count = (d) => d.count;

const defaultMargin = { top: 0, left: 0, right: 0, bottom: 0 };

export const Heatmap = ({ width, height, margin = defaultMargin }) => {
  const size = width;
  const xMax = size;
  const yMax = height;
  const colorMax = max(data, (d) => max(bins(d), count));
  const bucketSizeMax = max(data, (d) => bins(d).length);
  console.log("Max color: ", colorMax);
  console.log("Max bucket size: ", bucketSizeMax);

  const xScale = scaleLinear({
    domain: [0, data.length],
  });
  const yScale = scaleLinear({
    domain: [0, bucketSizeMax],
  });

  const rectColorScale = scaleLinear({
    range: [cool1, cool2],
    domain: [0, colorMax],
  });

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);
  const binWidth = xMax / data.length;
  const binHeight = yMax / bucketSizeMax;

  const [chessData, setChessData] = useState([]);
  useEffect(() => {
    // let data = fetchLichessCom("sp1nalcord");
    // let data = fetchChessCom("monarkjain");
    // data.then((res) => setChessData(res[3]));
  }, []);
  console.log(chessData);
  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        // fill={background}
      />
      <Group top={-binHeight}>
        <HeatmapRect
          data={data}
          xScale={(d) => xScale(d) ?? 0}
          yScale={(d) => yScale(d) ?? 0}
          colorScale={rectColorScale}
          // opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binHeight}
          gap={2}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className="visx-heatmap-rect"
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  fillOpacity={bin.opacity}
                  onClick={() => {
                    const { row, column } = bin;
                    alert(JSON.stringify({ row, column, bin: bin.bin }));
                  }}
                />
              ))
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
  );
};
