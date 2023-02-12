export interface Cell {
  isMine: boolean,
  isFlag: boolean,
  isRevealed: boolean,
  isDetonated: boolean,
  mineCount: number
}

export interface Board {
  level: string,
  width: number,
  height: number,
  mines: number,
  isEmpty: boolean,
  isDetonated: boolean,
  field: Cell[][]
}