import { createEmptyField } from "./boardCreator"

export const BOARD_LIST = [
  { 
    level: 'Beginner',
    width: 10, 
    height: 10, 
    mines: 10,
    isEmpty: true,
    isDetonated: false,
    field: createEmptyField(10, 10)
  },
  { 
    level: 'Intermediate',
    width: 16, 
    height: 16, 
    mines: 40,
    isEmpty: true,
    isDetonated: false,
    field: createEmptyField(16, 16)
  },
  { 
    level: 'Expert',
    width: 30, 
    height: 16, 
    mines: 99,
    isEmpty: true,
    isDetonated: false,
    field: createEmptyField(30, 16)
  }
]

export const ICONS = {
  unrevealed: '',
  flag: '🚩',
  mine:  '💣',
  empty: '⬜️',
  smiley: '😄',
  frown: '😵'
}