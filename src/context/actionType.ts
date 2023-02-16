import { Board } from '../minesweeper/types';

export enum ActionType {
  reset_board  = 'reset_board',
  create_mine_field = 'create_mine_field',
  reveal_cell = 'reveal_cell',
  toggle_flag = 'toggle_flag',
  reveal_neighbors = 'reveal_neighbors'
}

export type Action =
  | { type: ActionType.reset_board, payload: { board: Board }}
  | { type: ActionType.create_mine_field, payload: { board: Board, x: number, y: number }}
  | { type: ActionType.reveal_cell, payload: { x: number, y: number }}
  | { type: ActionType.toggle_flag, payload: { x: number, y: number }}
  | { type: ActionType.reveal_neighbors, payload: { x: number, y: number }}
