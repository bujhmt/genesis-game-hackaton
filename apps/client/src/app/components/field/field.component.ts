import {Component} from '@angular/core';
import {Direction, Tank} from '@game/models';
import {Select} from '@ngxs/store';
import {TanksState} from '../../state/tanks.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'game-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
  public rotationsMap: Record<Direction, number> = {
    [Direction.TOP]: 0,
    [Direction.BOTTOM]: 180,
    [Direction.LEFT]: 90,
    [Direction.RIGHT]: 90,
  }

  @Select(TanksState.tanks) public tanks$: Observable<Tank[]>;
}
