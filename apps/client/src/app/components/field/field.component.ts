import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {Direction, Tank} from '@game/models';
import {Select} from '@ngxs/store';
import {TanksState} from '../../state/tanks.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'game-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements AfterViewInit, OnDestroy {
  public readonly tickIntervals = 5;
  public intervalCounter = 0;
  private intervalId: ReturnType<typeof setInterval>;

  public rotationsMap: Record<Direction, number> = {
    [Direction.TOP]: 0,
    [Direction.BOTTOM]: 180,
    [Direction.LEFT]: -90,
    [Direction.RIGHT]: 90,
  }

  @Select(TanksState.tanks) public tanks$: Observable<Tank[]>;

  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      if (this.intervalCounter === this.tickIntervals) {
        // const tank = evalFunction(currentState);
        // emit state

        this.intervalCounter = 0;
      }

      this.intervalCounter++;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
