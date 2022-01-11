let boardNotation = {
  wra: "a1",
  wnb: "b1",
  wbc: "c1",
  wqd: "d1",
  wke: "e1",
  wbf: "f1",
  wng: "g1",
  wrh: "h1",
  wpa: "a2",
  wpb: "b2",
  wpc: "c2",
  wpd: "d2",
  wpe: "e2",
  wpf: "f2",
  wpg: "g2",
  wph: "h2",
  bra: "a8",
  bnb: "b8",
  bbc: "c8",
  bqd: "d8",
  bke: "e8",
  bbf: "f8",
  bng: "g8",
  brh: "h8",
  bpa: "a7",
  bpb: "b7",
  bpc: "c7",
  bpd: "d7",
  bpe: "e7",
  bpf: "f7",
  bpg: "g7",
  bph: "h7",
};

let data = {
  d2: {
    d4: 1,
    e6: 1,
    e5: 1,
    f6: 1,
  },
  g8: {
    g4: 1,
    d5: 2,
    e4: 1,
  },
  e2: {
    e5: 2,
    e8: 1,
    e4: 1,
    d4: 1,
  },
  e7: {
    e5: 5,
    e6: 1,
  },
  d1: {
    g4: 1,
    d6: 1,
    d3: 1,
  },
  f8: {
    f6: 1,
    e7: 1,
    g5: 1,
    e3: 1,
    e5: 1,
    h2: 1,
  },
  c7: {
    c4: 1,
    c6: 1,
    c7: 1,
  },
  c2: {
    c2: 2,
  },
  h1: {
    e1: 1,
    c5: 1,
    d8: 1,
  },
  b8: {
    c2: 1,
    c5: 1,
    d3: 2,
    e6: 1,
    d7: 1,
  },
  f2: {
    f6: 1,
    f4: 1,
    f5: 1,
  },
  c1: {
    e7: 1,
    g5: 1,
    e3: 1,
    d8: 1,
  },
  f1: {
    d5: 1,
    d3: 2,
  },
  b1: {
    c5: 1,
    c3: 1,
    d5: 1,
  },
  d8: {
    d6: 1,
    c5: 1,
    d8: 2,
  },
  h7: {
    h5: 1,
  },
  f7: {
    f5: 1,
    f4: 1,
    f6: 1,
  },
  g7: {
    g6: 1,
    f3: 1,
    g7: 1,
  },
  e8: {
    h8: 1,
    h5: 1,
    d8: 1,
  },
  c8: {
    f5: 1,
    f7: 1,
    g4: 1,
  },
  d7: {
    e5: 1,
    e4: 1,
    d4: 1,
    d5: 1,
  },
  g1: {
    c4: 1,
    e5: 1,
  },
  h8: {
    e8: 1,
    d8: 1,
  },
  b7: {
    c4: 1,
  },
  a7: {
    a4: 1,
  },
  a8: {
    f8: 1,
  },
  a1: {
    f8: 1,
  },
  a2: {
    a8: 1,
    a5: 1,
  },
  b2: {
    b2: 1,
  },
  h2: {
    h2: 1,
  },
};

export { boardNotation, data };
