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
export function processPgn() {
  let chess = new Chess();
  chess.load_pgn(
    '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2020.11.02"]\n[Round "-"]\n[White "monarkjain"]\n[Black "Litu136"]\n[Result "1-0"]\n[CurrentPosition "2kr1bnr/1Q6/3p1p2/4p1pp/4P3/P4N2/2q2PPP/1R3RK1 b - -"]\n[Timezone "UTC"]\n[ECO "C41"]\n[ECOUrl "https://www.chess.com/openings/Philidor-Defense-3.Bc4"]\n[UTCDate "2020.11.02"]\n[UTCTime "14:09:25"]\n[WhiteElo "701"]\n[BlackElo "683"]\n[TimeControl "600"]\n[Termination "monarkjain won by checkmate"]\n[StartTime "14:09:25"]\n[EndDate "2020.11.02"]\n[EndTime "14:16:00"]\n[Link "https://www.chess.com/game/live/5674394616"]\n\n1. e4 {[%clk 0:09:58.8]} 1... e5 {[%clk 0:09:51]} 2. Nf3 {[%clk 0:09:47.4]} 2... d6 {[%clk 0:09:48.9]} 3. Bc4 {[%clk 0:09:39.2]} 3... b6 {[%clk 0:09:47.1]} 4. O-O {[%clk 0:09:33.6]} 4... Bb7 {[%clk 0:09:45.2]} 5. Nc3 {[%clk 0:09:24]} 5... Nc6 {[%clk 0:09:45.1]} 6. Bb5 {[%clk 0:09:06.8]} 6... Qb8 {[%clk 0:09:45]} 7. Bxc6+ {[%clk 0:09:00.8]} 7... Bxc6 {[%clk 0:09:39.9]} 8. d4 {[%clk 0:08:50.6]} 8... Qd8 {[%clk 0:09:32.3]} 9. d5 {[%clk 0:08:46.3]} 9... Bb7 {[%clk 0:09:28.9]} 10. Bg5 {[%clk 0:08:42.4]} 10... f6 {[%clk 0:09:23.8]} 11. Be3 {[%clk 0:08:32.3]} 11... h6 {[%clk 0:09:07.8]} 12. b4 {[%clk 0:07:52.3]} 12... g5 {[%clk 0:09:05.8]} 13. a3 {[%clk 0:07:39.3]} 13... Qd7 {[%clk 0:09:02.3]} 14. Qd3 {[%clk 0:07:27.5]} 14... O-O-O {[%clk 0:08:56.7]} 15. Nb5 {[%clk 0:07:23.7]} 15... a6 {[%clk 0:08:44.2]} 16. Na7+ {[%clk 0:07:11.9]} 16... Kb8 {[%clk 0:08:42.1]} 17. Nc6+ {[%clk 0:06:35]} 17... Bxc6 {[%clk 0:08:39]} 18. dxc6 {[%clk 0:06:31.3]} 18... Qxc6 {[%clk 0:08:37.8]} 19. Rab1 {[%clk 0:06:19.9]} 19... h5 {[%clk 0:08:31.1]} 20. b5 {[%clk 0:06:07.1]} 20... axb5 {[%clk 0:08:26.9]} 21. Qxb5 {[%clk 0:06:03.4]} 21... Qxc2 {[%clk 0:08:18.5]} 22. Bxb6 {[%clk 0:05:33.6]} 22... cxb6 {[%clk 0:08:12.3]} 23. Qxb6+ {[%clk 0:05:32.7]} 23... Kc8 {[%clk 0:08:09.4]} 24. Qb7# {[%clk 0:05:27.6]} 1-0\n'
  );
  console.log(chess.history());
}
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
        let capturedPiece = capturedColor + currMove.captured + capturedFile;
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
    console.log("Game: ", i);
    let game = processGame(gamesMovesList[i]);
    let res = objectEquals(game, gamePiecesCaptureList[i]);
    if (res === false) {
      console.log("Error");
    }
  }
}

export function passMoves(gamesMovesList) {
  for (let i = 0; i < gamesMovesList.length; i++) {
    console.log("Game: ", i);
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
