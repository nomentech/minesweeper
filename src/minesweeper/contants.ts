import { createEmptyField } from "./boardCreator"

export const BOARD_LIST = [
  { 
    level: 'Beginner',
    width: 10, 
    height: 10, 
    mines: 10,
    flags: 0,
    unrevealed: 10*10,
    isEmpty: true,
    isPlaying: false,
    isWon: null,
    field: createEmptyField(10, 10)
  },
  { 
    level: 'Intermediate',
    width: 16, 
    height: 16, 
    mines: 40,
    flags: 0,
    unrevealed: 16*16,
    isEmpty: true,
    isPlaying: false,
    isWon: null,
    field: createEmptyField(16, 16)
  },
  { 
    level: 'Expert',
    width: 30, 
    height: 16, 
    mines: 99,
    flags: 0,
    unrevealed: 30*16,
    isEmpty: true,
    isPlaying: false,
    isWon: null,
    field: createEmptyField(30, 16)
  }
]

export const ICONS = {
  unrevealed: '',
  flag: '🚩',
  mine:  '💣',
  detonation: '💥',
  won: '😎',
  neutral: '😄',
  lost: '😔',
  numbers: ['⬜️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣']
}