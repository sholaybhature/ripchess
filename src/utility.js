export const finalPieces = (capturedDict, newDict) => {
  Object.entries(capturedDict).forEach(([key, value]) => {
    try {
      if (newDict[key][value]) {
        newDict[key][value] += 1;
      } else newDict[key][value] = 1;
    } catch (err) {
      newDict[key] = {
        [value]: 1,
      };
    }
  });
};
