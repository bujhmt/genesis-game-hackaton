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

    ctx.setState({tanksMap: {...tanksMap, [tank.id]: tank}});
  }

  @Action(RemoveTank)
  removeTank(ctx: StateContext<TanksStateModel>, {tank}: RemoveTank) {
    const {tanksMap} = ctx.getState();

    delete tanksMap[tank.id];

    ctx.setState({tanksMap: {...tanksMap, [tank.id]: tank}});
  }

  @Action(MoveForward)
  moveForward(ctx: StateContext<TanksStateModel>, {id}: MoveForward) {
    const {tanksMap} = ctx.getState();
    const tank = Object.assign({}, tanksMap[id]);

    if (tank.direction === Direction.BOTTOM) {
      tank.position.y = tank.position.y + 1;
    }

    if (tank.direction === Direction.TOP) {
      tank.position.y = tank.position.y - 1;
    }

    if (tank.direction === Direction.LEFT) {
      tank.position.x = tank.position.x - 1;
    }

    if (tank.direction === Direction.RIGHT) {
      tank.position.x = tank.position.x + 1;
    }

    ctx.setState({tanksMap: {...tanksMap, [tank.id]: tank}});
  }

  @Action(MoveBack)
  moveBack(ctx: StateContext<TanksStateModel>, {id}: MoveBack) {
    const {tanksMap} = ctx.getState();
    const tank = Object.assign({}, tanksMap[id]);

    if (tank.direction === Direction.BOTTOM) {
      tank.position.y = tank.position.y - 1;
    }

    if (tank.direction === Direction.TOP) {
      tank.position.y = tank.position.y + 1;
    }

    if (tank.direction === Direction.LEFT) {
      tank.position.x = tank.position.x + 1;
    }

    if (tank.direction === Direction.RIGHT) {
      tank.position.x = tank.position.x - 1;
    }

    ctx.setState({tanksMap: {...tanksMap, [tank.id]: tank}});
  }

  @Action(TurnRight)
  turnRight(ctx: StateContext<TanksStateModel>, {id}: TurnRight) {
    const {tanksMap} = ctx.getState();
    const tank = Object.assign({}, tanksMap[id]);


    const changeDirectionMap: Record<Direction, Direction> = {
      [Direction.RIGHT]: Direction.BOTTOM,
      [Direction.LEFT]: Direction.TOP,
      [Direction.TOP]: Direction.RIGHT,
      [Direction.BOTTOM]: Direction.LEFT,
    }

    tank.direction = changeDirectionMap[tank.direction];

    ctx.setState({tanksMap: {...tanksMap, [tank.id]: tank}});
  }

  @Action(TurnLeft)
  turnLeft(ctx: StateContext<TanksStateModel>, {id}: TurnLeft) {
    const {tanksMap} = ctx.getState();
    const tank = Object.assign({}, tanksMap[id]);

    const changeDirectionMap: Record<Direction, Direction> = {
      [Direction.RIGHT]: Direction.TOP,
      [Direction.LEFT]: Direction.BOTTOM,
      [Direction.TOP]: Direction.LEFT,
      [Direction.BOTTOM]: Direction.RIGHT,
    }

    tank.direction = changeDirectionMap[tank.direction];

    ctx.setState({tanksMap: {...tanksMap, [tank.id]: tank}});
  }
}
