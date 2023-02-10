import {Tank} from '@game/models';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {MoveBack, MoveForward, TurnRight, TurnLeft} from './tanks.actions';


interface TanksStateModel {
  tanksMap: Record<string, Tank>;
}

@State<TanksStateModel>({
  name: 'tanks',
  defaults: {
    tanksMap: {},
  }
})
export class TanksState {
  @Selector()
  static tanks({tanksMap}: TanksStateModel) {
    return Object.values(tanksMap);
  }

  @Action(MoveForward)
  moveForward(ctx: StateContext<TanksStateModel>, {id}: MoveForward) {
    const {tanksMap} = ctx.getState();
  }

  @Action(MoveBack)
  moveBack(ctx: StateContext<TanksStateModel>, {id}: MoveBack) {

  }

  @Action(MoveForward)
  turnRight(ctx: StateContext<TanksStateModel>, {id}: MoveForward) {

  }

  @Action(MoveBack)
  turnLeft(ctx: StateContext<TanksStateModel>, {id}: MoveBack) {

  }
}
