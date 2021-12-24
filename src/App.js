import logo from "./logo.svg";
import "./App.css";
import Chess from "./chess2";
// import * as Chess from "chess"
let chess = new Chess();
// let chessGame = "d4 d5 e4 dxe4 f3 exf3 gxf3 e5 dxe5 f6 exf6 gxf6 f4 f5"
let chessGame = "d4 d5 e4 dxe4 f3 exf3 gxf3 e5 dxe5 f6 exf6 gxf6 f4 f5"
let chessMoves = chessGame.split(" ")
let chessPieces = {}
let capturingPawns = {}
let finalCapturedPawns = {}
let capturedPiece
for (let i =0; i < chessMoves.length; i++) {
  let currMove = chess.move(chessMoves[i])
  let piece = currMove.color + currMove.file
  Object.entries(chessPieces).forEach(([k, val])=>{
    for (let j =0; j<val.length;j++){
      if (val[j]==currMove.from){
        piece = k
      }
    }
  })
  if (currMove.flags == "c") {
    let capturedColor = currMove.color == "w" ? "b" : "w"
    let capturedFile = currMove.tofile
    capturedPiece = capturedColor + capturedFile

    try {
      finalCapturedPawns[capturedPiece] = chessPieces[capturedPiece].at(-1)
      delete chessPieces[capturedPiece]
    }
    catch (err) {
      Object.entries(chessPieces).forEach(([k, val])=>{
        for (let j =0; j<val.length;j++){
          if (val[j]==currMove.to){
            capturedPiece = k
          }
        }
      })
      finalCapturedPawns[capturedPiece] = chessPieces[capturedPiece].at(-1)
      delete chessPieces[capturedPiece]
    }
  }
  console.log(piece,capturedPiece)
  if (chessPieces[piece]) {
    chessPieces[piece].push(currMove.to)
  } else {
    chessPieces[piece] = [currMove.to]
  }
}

let chessHistory = chess.history({verbose:true})
console.log(chessHistory)
// console.log(chessCaptures)
console.log(chessPieces)
console.log(finalCapturedPawns)
function App() {
    return <div className="App"></div>;
}

export default App;
