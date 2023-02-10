import {Position} from './position.interface';
import {Direction} from '../enums';

export interface Tank {
  id: string,
  position: Position
  direction: Direction;
}
