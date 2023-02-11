import { Cell } from "./types"

export const BOARD_LIST = [
  { 
    level: 'Beginner',
    width: 10, 
    height: 10, 
    mines: 10,
    isEmpty: true,
    field: createEmptyField(10, 10)
  },
  { 
    level: 'Intermediate',
    width: 16, 
    height: 16, 
    mines: 40,
    isEmpty: true,
    field: createEmptyField(16, 16)
  },
  { 
    level: 'Expert',
    width: 30, 
    height: 16, 
    mines: 99,
    isEmpty: true,
    field: createEmptyField(30, 16)
  }
]

function createEmptyField(width: number, height: number) {
  const field: Cell[][] = [] 
  for (let i = 0; i < height; i++) {
    field[i] = []
    for (let j = 0; j < width; j++) {
      field[i][j] = {
        isMine: false,
        isFlag: false,
        isRevealed: false,
        mineCount: 0
      }
    }
  }
  
  return field
}