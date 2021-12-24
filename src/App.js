import logo from "./logo.svg";
import "./App.css";
import Chess from "./chess2";
import boardNotation from "./board";
import {game1, game1Captures} from './testLogic'
// import * as Chess from "chess"
// todo: wirte a test, reformat code, remove additions from chess.js
// todo: handle for pawn promotions and castling
let chess = new Chess();
// let chessGame = "d4 d5 e4 e5 Qg4 f5 Bf4 c5 Nc3 b5 O-O-O exd4 Rxd4";
let chessGame = "e4 e5 Nf3 Nc6 a3 Bc5 g3 Nf6 Nc3 O-O Bg2 d6 O-O Bg4 d3 a5 Nd5 Nxd5 exd5 Nd4 Be3 a4 c3 Nb3 Rb1 c6 d4 Bb6 dxe5 Bxe3 fxe3 dxe5 Qd3 Qd6 Nd2 Bf5 Rxf5 g6 Nc4 Qc5 Rxe5 Rad8 d6 b5 Rxc5 Nxc5 Qd4 Ne6 Qa7 bxc4 Rd1 f5 Bxc6 g5 d7 f4 exf4 gxf4 Bd5 Rfe8 dxe8=Q+ Rxe8 Bxc4 f3 Rf1 Rf8 Qxa4 Kf7 Rxf3+ Ke7 Rxf8 Kxf8 Bxe6 Ke7 Qc6 Kf6 a4 h5 a5 h4 a6 h3 a7 Kg5 a8=Q Kf6 Qf8+ Kg5 Qcf3 Kg6 Qg8+ Kh6 Qf6+ Kh5 Qgg5#"
// let chessGame = "e4 e5 Nf3 Nc6 a3 Bc5 g3 Nf6 Nc3 O-O Bg2 d6 O-O Bg4 d3 a5 Nd5 Nxd5 exd5 Nd4 Be3 a4 c3 Nb3 Rb1 c6 d4 Bb6 dxe5 Bxe3 fxe3 dxe5 Qd3 Qd6 Nd2 Bf5 Rxf5 g6 Nc4 Qc5 Rxe5 Rad8 d6 b5 Rxc5 Nxc5 Qd4 Ne6 Qa7 bxc4 Rd1 f5 Bxc6 g5 d7 f4 exf4 gxf4 Bd5 Rfe8 dxe8=Q+"
let chessMoves = chessGame.split(" ");
let chessPieces = {};
let finalCapturedPawns = {};
let capturedPiece;
for (let i = 0; i < chessMoves.length; i++) {
    let currMove = chess.move(chessMoves[i]);
    let piece = currMove.color + currMove.piece + currMove.file;
    // console.log(piece)
    // castling
    if (currMove.san == "O-O") {
      let rookPiece = currMove.color + "rh"
      chessPieces[rookPiece] = currMove.color == "w" ? ["f1"] : ["f8"]
    }
    if (currMove.san == "O-O-O") {
      let rookPiece = currMove.color + "ra"
      chessPieces[rookPiece] = currMove.color == "w" ? ["d1"] : ["d8"]
    }
    // if the moved file is different, suppose Re4 -> Rf4. 
    Object.entries(chessPieces).forEach(([k, val]) => {
        let lastPiece = k.charAt(1);
        for (let j = 0; j < val.length; j++) {
            if (val[j] == currMove.from && lastPiece == currMove.piece) {
                piece = k;
            }
        }
    });
    // console.log(piece)
    if (
        currMove.flags == "c" ||
        currMove.flags == "e" ||
        currMove.flags == "p" ||
        currMove.flags == "cp"
    ) {
        let capturedColor = currMove.color == "w" ? "b" : "w";
        let capturedFile = currMove.tofile;
        let capturedPieceCode = currMove.captured;
        capturedPiece = capturedColor + capturedPieceCode + capturedFile;
        // if captured piece file is different
        Object.entries(chessPieces).forEach(([k, val]) => {
            // since en passant jumps twice, there might be a piece prior where the
            // capturing pawn will go.
            if (
                currMove.flags == "c" ||
                currMove.flags == "p" ||
                currMove.flags == "cp"
            ) {
                for (let j = 0; j < val.length; j++) {
                    if (val[j] == currMove.to) {
                        capturedPiece = k;
                    }
                }
            }
        });

        // if piece is captured at original location
        if (!chessPieces[capturedPiece]) {
            console.log(1);
            console.log(piece, capturedPiece)
            finalCapturedPawns[boardNotation[capturedPiece]] = currMove.to;
        } else {
            finalCapturedPawns[boardNotation[capturedPiece]] =
                chessPieces[capturedPiece].at(-1);
            delete chessPieces[capturedPiece];
        }
    }
    if (chessPieces[piece]) {
        chessPieces[piece].push(currMove.to);
    } else {
        chessPieces[piece] = [currMove.to];
    }
    // if a pawn is promoted, it's over for that pawn, no need to track the promoted piece
    if (currMove.flags == "cp" || currMove.flags == "p") {
      if (!finalCapturedPawns[boardNotation[piece]]) {
        finalCapturedPawns[boardNotation[piece]] = chessPieces[piece].at(-1);
        delete chessPieces[piece];
      }
  }
}
// if promoted piece gets captured later, it gives undefined as boardnotation doesn't have notation for it, so remove that undefined
Object.keys(finalCapturedPawns).forEach((key) => {
  if (key=="undefined"){
    delete finalCapturedPawns[key]
  }
})

if (chess.in_checkmate()) {
    let king = chess.turn() + "ke";
    if (chessPieces[king]) {
        finalCapturedPawns[boardNotation[king]] = chessPieces[king].at(-1);
    } else {
        finalCapturedPawns[boardNotation[king]] =
            chess.turn() == "b" ? "e1" : "e8";
    }
}
let chessHistory = chess.history({ verbose: true });
console.log(chessHistory);
// console.log(chessCaptures)
console.log(chessPieces);
console.log(finalCapturedPawns);
function App() {
    return <div className="App"></div>;
}

export default App;
