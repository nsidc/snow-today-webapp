// TODO: Can this be an interface? Was previously a type because recoil (using
// an interface instead of a type is not compatible with AtomFamily type
// signature: https://github.com/facebookexperimental/Recoil/issues/457)
export type ITileIdentifier = {
  row: number;
  col: number;
}

export const tileTypes = ['map', 'plot'] as const;
export type TileType = typeof tileTypes[number];
