export interface Cell {
  isMine: boolean,
  isFlag: boolean,
  isRevealed: boolean,
  isDetonated: boolean,
  isWrongFlag: boolean,
  mineCount: number
}

export interface Board {
  level: string,
  width: number,
  height: number,
  mines: number,
  flags: number,
  unrevealed: number,
  isEmpty: boolean,
  isPlaying: boolean
  isWon: boolean | null,
  field: Cell[][]
}