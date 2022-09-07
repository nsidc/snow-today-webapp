const MAX_COLS = 2;
// MAX_ROWS is based on the number of available variables.
// TODO: Derive this from the variablesIndex?
const MAX_ROWS = 4;


// Make 1-indexed arrays: [1, 2, ..., MAX]
export const COL_OPTIONS = Array.from(
  new Array(MAX_COLS),
  (_, i) => i + 1,
);
export const ROW_OPTIONS = Array.from(
  new Array(MAX_ROWS),
  (_, i) => i + 1,
);
