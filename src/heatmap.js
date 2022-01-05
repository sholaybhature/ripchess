import React, { useState, useEffect } from 'react'
//import { Group } from '@visx/group';
//import genBins, { Bin, Bins } from '@visx/mock-data/lib/generators/genBins';
//import { scaleLinear } from '@visx/scale';
//import { HeatmapCircle, HeatmapRect } from '@visx/heatmap';
//import { getSeededRandom } from '@visx/mock-data';

import { fetchChessCom } from "./chesscom";
import { fetchLichessCom } from "./lichess";


let username= "sp1nalcord";


function Heatmap() {
    let fetched = false;
    const [data, setData] = useState();
    useEffect(() => {
        main();
    }, [])
    
    async function main() {
    let res = await fetchLichessCom(username);
    setData(res);
    }
    if(data) {
    console.log(data);
    // Object.keys(data).map(function(key, index) {
    // console.log(data[key])
    // })
    fetched = true;
    }
    return (
        <div>
            {fetched ? <div>{Object.keys(data).map(function(key, index) {
    console.log(data[key])
    })}</div> : <div>HELLO v2.0</div> }
        </div>
    )
}

export default Heatmap;
