export interface Cell {
  isMine: boolean,
  isFlag: boolean,
  isRevealed: boolean,
  mineCount: number
}

export interface Board {
  level: string,
  width: number,
  height: number,
  mines: number,
  isEmpty: boolean,
  field: Cell[][]
}