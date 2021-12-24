import logo from "./logo.svg";
import "./App.css";
import Chess from "./chess2";
import boardNotation from "./board";
import {
    game1,
    game1Captures,
    game2,
    game2Captures,
    objectEquals,
} from "./testLogic";

// import * as Chess from "chess"
// todo: remove additions from chess.js

/**
 * Given a list of the moves in a chess game, return the squares where the pieces were captured.
 * @param  {String} chessMovesList       all the moves that were played in a game
 * @return {Dict}   finalCapturedPieces   squares where the pieces were captured
 */
function processGame(chessMovesList) {
    let chess = new Chess();
    let chessMoves = chessMovesList.split(" ");
    // To keep track of individual chess pieces
    let chessPieces = {};
    let finalCapturedPieces = {};
    let capturedPiece;

    // Iterate over all the chess moves
    for (let i = 0; i < chessMoves.length; i++) {
        let currMove = chess.move(chessMoves[i]);
        // Uniquely identify each chess piece, for better searching
        // For example: white's a file rook -> wra
        let piece = currMove.color + currMove.piece + currMove.file;

        // If castling, move the rook to it's new place
        if (currMove.san == "O-O") {
            let rookPiece = currMove.color + "rh";
            chessPieces[rookPiece] = currMove.color == "w" ? ["f1"] : ["f8"];
        }
        if (currMove.san == "O-O-O") {
            let rookPiece = currMove.color + "ra";
            chessPieces[rookPiece] = currMove.color == "w" ? ["d1"] : ["d8"];
        }

        // if the moved file is different, suppose Re4 -> Rf4.
        /* 
        * If the piece moves in the same file, it'll be identified correctly. 
        * But, if the piece moves to a different file, we can find the original 
        * square by looking where it was at it's previous move. 
        * For example: Initially, if Ra1 moves to Rb1 -> chessPieces[wra] = [b1]
        * If it now moves to Rc1, we have no idea where did it originally belong to. 
        * It could be the right side rook too (Rh8), who knows? So, we check in the 
        * chessPieces, where did it move from and then it's key would be the original piece.
        */
        Object.entries(chessPieces).forEach(([k, val]) => {
            let lastPiece = k.charAt(1);
            for (let j = 0; j < val.length; j++) {
                // Check last piece and current piece to make sure other pieces which moved from that
                // square won't be included. For example:
                if (val[j] == currMove.from && lastPiece == currMove.piece) {
                    piece = k;
                }
            }
        });
        // console.log(piece)
        if (
            currMove.flags == "c" ||
            currMove.flags == "e" ||
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
                console.log(piece, capturedPiece);
                finalCapturedPieces[boardNotation[capturedPiece]] = currMove.to;
            } else {
                finalCapturedPieces[boardNotation[capturedPiece]] =
                    chessPieces[capturedPiece].at(-1);
                delete chessPieces[capturedPiece];
            }
        }
        // if a pawn is promoted, it's over for that pawn, no need to track the promoted piece
        if (currMove.flags == "cp" || currMove.flags == "np") {
            console.log(piece)
            chessPieces[piece].push(currMove.to);
            finalCapturedPieces[boardNotation[piece]] = chessPieces[piece].at(-1);
            delete chessPieces[piece];
            piece = piece + "P";
            console.log(piece)
        }
        if (chessPieces[piece]) {
            chessPieces[piece].push(currMove.to);
        } else {
            chessPieces[piece] = [currMove.to];
        }
    }
    // if promoted piece gets captured later, it gives undefined as boardnotation doesn't have notation for it, so remove that undefined
    Object.keys(finalCapturedPieces).forEach((key) => {
        if (key == "undefined") {
            delete finalCapturedPieces[key];
        }
    });

    if (chess.in_checkmate()) {
        let king = chess.turn() + "ke";
        if (chessPieces[king]) {
            finalCapturedPieces[boardNotation[king]] = chessPieces[king].at(-1);
        } else {
            finalCapturedPieces[boardNotation[king]] =
                chess.turn() == "b" ? "e1" : "e8";
        }
    }
    let chessHistory = chess.history({ verbose: true });
    console.log("History: ", chessHistory);
    console.log("Chess Pieces: ", chessPieces);
    console.log("Captured: ", finalCapturedPieces);
    return finalCapturedPieces;
}

function testCode(gamesMovesList, gamePiecesCaptureList) {
    for (let i = 0; i < gamesMovesList.length; i++) {
        let game = processGame(gamesMovesList[i]);
        let res = objectEquals(game, gamePiecesCaptureList[i]);
        if (res===false) {
            console.log('Error')
        }
    }
}
// processGame("e4 e5 Nf3 Nc6 a3 Bc5 g3 Nf6 Nc3 O-O Bg2 d6 O-O Bg4 d3 a5 Nd5 Nxd5 exd5 Nd4 Be3 a4 c3 Nb3 Rb1 c6 d4 Bb6 dxe5")
testCode([game1, game2], [game1Captures, game2Captures]);

function App() {
    return <div className="App"></div>;
}

export default App;
