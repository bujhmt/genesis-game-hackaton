import {Direction, Tank} from '@game/models';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {MoveBack, MoveForward, RemoveTank, SetTank, TurnLeft, TurnRight} from './tanks.actions';
import {Injectable} from '@angular/core';

interface TanksStateModel {
  tanksMap: Record<string, Tank>;
}

@State<TanksStateModel>({
  name: 'tanks',
  defaults: {
    tanksMap: {},
  }
})
@Injectable()
export class TanksState {
  @Selector()
  static tanks({tanksMap}: TanksStateModel) {
    return Object.values(tanksMap);
  }

  @Action(SetTank)
  setTank(ctx: StateContext<TanksStateModel>, {tank}: SetTank) {
    const {tanksMap} = ctx.getState();

    ctx.patchState({
      tanksMap: {
        ...tanksMap,
        [tank.id]: tank,
      }
    });
  }

  @Action(RemoveTank)
  removeTank(ctx: StateContext<TanksStateModel>, {tank}: RemoveTank) {
    const {tanksMap} = ctx.getState();

    delete tanksMap[tank.id];

    ctx.patchState(tanksMap);
  }

  @Action(MoveForward)
  moveForward(ctx: StateContext<TanksStateModel>, {id}: MoveForward) {
    const {tanksMap} = ctx.getState();
    const tank = tanksMap[id];

    if (!tank) {
      return;
    }

    if (tank.direction === Direction.BOTTOM) {
      tank.position.y = tank.position.y + 1;
    }

    if (tank.direction === Direction.TOP) {
      tank.position.y = tank.position.y - 1;
    }

    if (tank.direction === Direction.LEFT) {
      tank.position.y = tank.position.x - 1;
    }

    if (tank.direction === Direction.RIGHT) {
      tank.position.y = tank.position.x + 1;
    }

    ctx.patchState({...tanksMap, [id]: tank});
  }

  @Action(MoveBack)
  moveBack(ctx: StateContext<TanksStateModel>, {id}: MoveBack) {
    const {tanksMap} = ctx.getState();
    const tank = tanksMap[id];

    if (!tank) {
      return;
    }

    if (tank.direction === Direction.BOTTOM) {
      tank.position.y = tank.position.y - 1;
    }

    if (tank.direction === Direction.TOP) {
      tank.position.y = tank.position.y + 1;
    }

    if (tank.direction === Direction.LEFT) {
      tank.position.y = tank.position.x + 1;
    }

    if (tank.direction === Direction.RIGHT) {
      tank.position.y = tank.position.x - 1;
    }

    ctx.patchState({...tanksMap, [id]: tank});
  }

  @Action(TurnRight)
  turnRight(ctx: StateContext<TanksStateModel>, {id}: TurnRight) {
    const {tanksMap} = ctx.getState();
    const tank = tanksMap[id];

    if (tank.direction === Direction.BOTTOM) {
      tank.direction = Direction.LEFT;
    }

    if (tank.direction === Direction.TOP) {
      tank.direction = Direction.RIGHT;
    }

    if (tank.direction === Direction.LEFT) {
      tank.direction = Direction.BOTTOM;
    }

    if (tank.direction === Direction.RIGHT) {
      tank.direction = Direction.TOP;
    }

    ctx.patchState({...tanksMap, [id]: tank});
  }

  @Action(TurnLeft)
  turnLeft(ctx: StateContext<TanksStateModel>, {id}: TurnLeft) {
    const {tanksMap} = ctx.getState();
    const tank = tanksMap[id];

    if (tank.direction === Direction.BOTTOM) {
      tank.direction = Direction.RIGHT;
    }

    if (tank.direction === Direction.TOP) {
      tank.direction = Direction.LEFT;
    }

    if (tank.direction === Direction.LEFT) {
      tank.direction = Direction.TOP;
    }

    if (tank.direction === Direction.RIGHT) {
      tank.direction = Direction.BOTTOM;
    }

    ctx.patchState({...tanksMap, [id]: tank});
  }
}
