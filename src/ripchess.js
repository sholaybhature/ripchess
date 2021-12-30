import {
    game1,
    game1Captures,
    game2,
    game2Captures,
    game3,
    game3Captures,
    game4,
    game4Captures,
    objectEquals,
} from "./testLogic";

import boardNotation from "./board";
import * as Chess from "chess.js";
import movesArray from "./lichess";

/**
 * Given a list of the moves in a chess game, return the squares where the pieces were captured.
 * Basic logic is to track the last move of each piece using a dict, and delete that piece
 * from dict when the piece is captured.
 * @param  {String} chessMovesList       all the moves that were played in a game
 * @return {Dict}   finalCapturedPieces   squares where the pieces were captured
 */
export function processGame(chessMovesList) {
    let chess = new Chess();
    let chessMoves = chessMovesList.split(" ");
    // To keep track of individual chess pieces
    let chessPieces = {};
    let finalCapturedPieces = {};

    // Iterate over all the chess moves
    for (let i = 0; i < chessMoves.length; i++) {
        let currMove = chess.move(chessMoves[i]);
        let currMoveFile = currMove.from.charAt(0);
        // Uniquely identify each chess piece, for better searching
        // For example: white's a file rook -> wra
        let piece = currMove.color + currMove.piece + currMoveFile;

        // If castling, move the rook to it's new place
        if (currMove.san == "O-O") {
            let rookPiece = currMove.color + "rh";
            chessPieces[rookPiece] = currMove.color == "w" ? ["f1"] : ["f8"];
        }
        if (currMove.san == "O-O-O") {
            let rookPiece = currMove.color + "ra";
            chessPieces[rookPiece] = currMove.color == "w" ? ["d1"] : ["d8"];
        }

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
            // Check last piece and current piece to make sure other pieces which moved from that
            // square won't be included. For example: Nc3 -> Nd5 and then later at some point c3 -> c4
            if (val == currMove.from && lastPiece == currMove.piece) {
                piece = k;
            }
        });

        // If there's a capture, track that captured piece by locating where it last moved to.
        if (
            currMove.flags == "c" ||
            currMove.flags == "e" ||
            currMove.flags == "cp"
        ) {
            let capturedPiece;
            // Search for the captured piece
            Object.entries(chessPieces).forEach(([k, val]) => {
                if (currMove.flags == "c" || currMove.flags == "cp") {
                    if (val == currMove.to) {
                        capturedPiece = k;
                    }
                }
                // En Passant
                if (currMove.flags == "e") {
                    let capturedColor = currMove.color == "w" ? "b" : "w";
                    let capturedFile = currMove.to.charAt(0);
                    capturedPiece = capturedColor + "p" + capturedFile;
                }
            });
            // If piece is captured at original location. For example: Nb1
            if (!chessPieces[capturedPiece]) {
                let capturedColor = currMove.color == "w" ? "b" : "w";
                let capturedFile = currMove.to.charAt(0);
                let capturedPiece =
                    capturedColor + currMove.captured + capturedFile;
                finalCapturedPieces[boardNotation[capturedPiece]] = currMove.to;
            } else {
                /*
                 * Update the square of captured piece in final captured pieces and delete
                 * it from tracking it further. If we don't delete it, there can be
                 * pieces with multiple same squares, like a dead piece sitting at an
                 * alive piece's square.
                 */
                finalCapturedPieces[boardNotation[capturedPiece]] =
                    chessPieces[capturedPiece];
                delete chessPieces[capturedPiece];
            }
        }
        // If a pawn is promoted, it's now considered to be captured, and no need to track the promoted piece.
        if (currMove.flags == "cp" || currMove.flags == "np") {
            chessPieces[piece] = currMove.to;
            finalCapturedPieces[boardNotation[piece]] = chessPieces[piece];
            delete chessPieces[piece];
            // Uniquely identify the promoted piece, but ignore if it's captured in the future.
            piece = piece + "P";
        }
        // Update or create the piece's location
        if (!chessPieces[piece] || chessPieces[piece]) {
            chessPieces[piece] = currMove.to;
        }
    }
    // If promoted piece gets captured later, it gives undefined as boardNotation doesn't have notation for it, so remove that undefined.
    Object.keys(finalCapturedPieces).forEach((key) => {
        if (key == "undefined") {
            delete finalCapturedPieces[key];
        }
    });

    // Update the final king's square if there's a checkmate.
    if (chess.in_checkmate()) {
        let king = chess.turn() + "ke";
        if (chessPieces[king]) {
            finalCapturedPieces[boardNotation[king]] = chessPieces[king];
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

// Ignore, just for testing
export function testCode(gamesMovesList, gamePiecesCaptureList) {
    for (let i = 0; i < gamesMovesList.length; i++) {
        console.log("Game: ", i)
        let game = processGame(gamesMovesList[i]);
        let res = objectEquals(game, gamePiecesCaptureList[i]);
        if (res === false) {
            console.log("Error");
        }
    }
}

export function passMoves(gamesMovesList) {
    for(let i=0; i<gamesMovesList.length; i++) {
        console.log('Game: ', i)
        processGame(gamesMovesList[i]);
    }
}

// export function checkCode() {
//     passMoves(movesArray);
// }
// export function checkCode() {}
// console.log(movesArray);
// export function checkCode() {
//     testCode(
//         [game1, game2, game3, game4],
//         [game1Captures, game2Captures, game3Captures, game4Captures]
//     );
// }

