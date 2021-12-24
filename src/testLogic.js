// https://lichess.org/752ShqAw#17
const game1 =
    "e4 e5 Nf3 Nc6 a3 Bc5 g3 Nf6 Nc3 O-O Bg2 d6 O-O Bg4 d3 a5 Nd5 Nxd5 exd5 Nd4 Be3 a4 c3 Nb3 Rb1 c6 d4 Bb6 dxe5 Bxe3 fxe3 dxe5 Qd3 Qd6 Nd2 Bf5 Rxf5 g6 Nc4 Qc5 Rxe5 Rad8 d6 b5 Rxc5 Nxc5 Qd4 Ne6 Qa7 bxc4 Rd1 f5 Bxc6 g5 d7 f4 exf4 gxf4 Bd5 Rfe8 dxe8=Q+ Rxe8 Bxc4 f3 Rf1 Rf8 Qxa4 Kf7 Rxf3+ Ke7 Rxf8 Kxf8 Bxe6 Ke7 Qc6 Kf6 a4 h5 a5 h4 a6 h3 a7 Kg5 a8=Q Kf6 Qf8+ Kg5 Qcf3 Kg6 Qg8+ Kh6 Qf6+ Kh5 Qgg5#";
const game1Captures = {
    b1: "d5",
    g8: "d5",
    e7: "e5",
    c1: "e3",
    f8: "e3",
    d2: "e5",
    c8: "f5",
    d7: "e5",
    d8: "c5",
    h1: "c5",
    g1: "c4",
    c7: "c6",
    f7: "f4",
    f2: "f4",
    e2: "e8",
    h8: "e8",
    b7: "c4",
    a7: "a4",
    g7: "f3",
    a8: "f8",
    a1: "f8",
    b8: "e6",
    a2: "a8",
    e8: "h5",
};

// https://lichess.org/BkhWOMuL
const game2 =
    "d4 d5 Nf3 Nc6 Nc3 Nf6 e3 a6 Bd3 g6 e4 e6 e5 Ng4 Bg5 Be7 h4 O-O Qe2 Bxg5 hxg5 Nb4 Rh4 Nxd3+ cxd3 h5 gxh6 f5 exf6 e5 dxe5 d4 Qe4 dxc3 Qxg6+ Kh8 Qg7#";
const game2Captures = {
    c1: "g5",
    f8: "g5",
    f1: "d3",
    b8: "d3",
    h7: "h5",
    f7: "f5",
    e7: "e5",
    b1: "c3",
    g7: "g6",
    e8: "h8",
};

// https://lichess.org/o8BAALZL
const game3 =
    "e3 e5 Nf3 Nc6 Bc4 d5 Bb3 Be6 c4 Nf6 cxd5 Bxd5 Bxd5 Nxd5 d4 e4 Ne5 Nxe5 dxe5 Qg5 Qa4+ c6 b4 Nxb4 Qxb4 Bxb4+";
const game3Captures = {
    d7: "d5",
    c2: "d5",
    c8: "d5",
    f1: "d5",
    g1: "e5",
    b8: "e5",
    b2: "b4",
    g8: "b4",
    d1: "b4",
};

// https://lichess.org/1jkn0aKA
const game4 =
    "d4 Nf6 Nf3 g6 Ng5 Bg7 e3 d5 Nc3 e6 Bb5+ Bd7 Bd3 O-O h4 h6 Nf3 Re8 g4 Nxg4 Ng5 Nf6 e4 hxg5 e5 Ne4 Nxe4 dxe4 Bxe4 gxh4 Rxh4 Kf8 Qf3 Qxh4 Bxg6 Ke7 Qxf7+ Kd8 Qxg7 c6 Bxe8 Bxe8 Bg5+ Qxg5 Qxg5+ Kc7 Qf6 Bd7 Rd1 Na6 c4 Nb4 a3 Na6 d5 cxd5 cxd5 exd5 Rc1+ Bc6 Qf7+ Kb6 e6 Rh8 e7 Rh1+ Ke2 Rxc1 e8=Q Bxe8 Qxe8 Rc2+ Kd3 Rxb2 f4 Rb3+ Kc2 Rxa3 Qd8+ Nc7 Qd6+ Ka5 Qxa3+ Kb6 f5 Kc6 f6 Ne6 Qe3 Kd7 Qd3 Nf4 Qb5+ Kd6 f7 Ke6 Qe8+ Kf6 f8=Q+";
const game4Captures = {
    g2: "g4",
    g1: "g5",
    g8: "e4",
    b1: "e4",
    d7: "e4",
    h2: "h4",
    h7: "h4",
    h1: "h4",
    g7: "g6",
    f7: "f7",
    f8: "g7",
    h8: "e8",
    f1: "e8",
    c1: "g5",
    d8: "g5",
    d2: "d5",
    c7: "d5",
    c2: "d5",
    a1: "c1",
    e2: "e8",
    c8: "e8",
    b2: "b2",
    a2: "a3",
    a8: "a3",
    f2: "f8",
};

function objectEquals(obj1, obj2) {
    let c = 0;
    for (var i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if (!obj2.hasOwnProperty(i)) {
                c += 1;
                console.log("obj2 doesnt have property: ", i);
            }
            if (obj1[i] != obj2[i]) {
                c += 1;
                console.log("obj2 value isnt equal: ", i);
            }
        }
    }
    for (var i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            if (!obj1.hasOwnProperty(i)) {
                c += 1;
                console.log("obj1 doesnt have property: ", i);
            }
            if (obj1[i] != obj2[i]) {
                c += 1;
                console.log("obj2 value isnt equal: ", i);
            }
        }
    }
    if (c > 0) {
        return false;
    }

    return true;
}

export {
    game1,
    game1Captures,
    game2,
    game2Captures,
    game3,
    game3Captures,
    game4,
    game4Captures,
    objectEquals,
};
