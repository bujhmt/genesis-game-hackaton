import {Tank} from '@game/models';

export class AbstractAction {
  constructor(
    public readonly id: string,
  ) {
  }
}

export class SetTank {
  static type = '[Tanks] SetTank';

  constructor(
    public readonly tank: Tank,
  ) {
  }
}

export class RemoveTank  {
  static type = '[Tanks] RemoveTank';

  constructor(
    public readonly tank: Tank,
  ) {
  }
}

export class MoveForward extends AbstractAction {
  static type = '[Tanks] MoveForward';
}

export class MoveBack extends AbstractAction {
  static type = '[Tanks] MoveBack';
}

export class TurnRight extends AbstractAction {
  static type = '[Tanks] TurnRight';
}

export class TurnLeft extends AbstractAction {
  static type = '[Tanks] TurnLeft';

}
