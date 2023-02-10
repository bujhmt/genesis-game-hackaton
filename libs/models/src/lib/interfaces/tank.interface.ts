import {Position} from "./position.interface";

export interface Tank {
  id:string,
  position: Position
  direction: string;

  shoot(x: number, y: number): void;

  move(direction: string): void;

}
