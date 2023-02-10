import {Tank} from '@game/models';

export class SetTank {
  static type = '[Tanks] SetTank';

  constructor(
    public readonly tank: Tank,
  ) {
  }
}

export class RemoveTank {
  static type = '[Tanks] RemoveTank';

  constructor(
    public readonly tank: Tank,
  ) {
  }
}

export class MoveForward {
  static type = '[Tanks] MoveForward';

  constructor(
    public readonly id: string,
  ) {
  }
}

export class MoveBack {
  static type = '[Tanks] MoveBack';

  constructor(
    public readonly id: string,
  ) {
  }
}

export class TurnRight {
  static type = '[Tanks] TurnRight';

  constructor(
    public readonly id: string,
  ) {
  }
}

export class TurnLeft {
  static type = '[Tanks] TurnLeft';

  constructor(
    public readonly id: string,
  ) {
  }
}
