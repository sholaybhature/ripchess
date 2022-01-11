// Replace this with a dict?
const convertSANToNumber = (san) => {
  let letter = san.charCodeAt(0) - 97;
  let numeric = parseInt(san[1], 10);
  let res = letter + (numeric - 1) * 8;
  return res;
};

export const updateFinalPieces = (capturedDict, newDict) => {
  Object.entries(capturedDict).forEach(([key, value]) => {
    // Because index is from 0-32
    let keyNumeric = convertSANToNumber(key) % 32;
    let valNumeric = convertSANToNumber(value);
    // For visx heatmap, remainder for col and divisor for row
    let remainder = valNumeric % 8;
    let divisor = (valNumeric - remainder) / 8;
    // First select the numeric piece, then it's row and col
    newDict[keyNumeric][remainder].bins[divisor].count += 1;
  });
};

// As per visx heatmap requirements
export const chessDict = () => {
  let finalDict = {};
  let binSize = 50;
  for (let a = 0; a < 32; a++) {
    finalDict[a] = [];
    for (let i = 0; i < 8; i++) {
      finalDict[a].push({
        bin: i,
        bins: [],
      });
      for (let j = 0; j < 8; j++) {
        finalDict[a][i].bins.push({
          bin: j * binSize,
          count: 0,
        });
      }
    }
  }
  return finalDict;
};
