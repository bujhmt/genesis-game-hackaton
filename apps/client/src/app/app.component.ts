import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {MoveBack, MoveForward, SetTank, TurnLeft, TurnRight} from './state/tanks.actions';
import {Direction} from '@game/models';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private clientId = 'client';

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new SetTank({
      id: this.clientId,
      position: {
        y: 2,
        x: 2,
      },
      direction: Direction.TOP,
    }))
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key)
    if (event.key === 'w') {
      this.store.dispatch(new MoveForward(this.clientId))
    }

    if (event.key === 's') {
      this.store.dispatch(new MoveBack(this.clientId))
    }

    if (event.key === 'd') {
      this.store.dispatch(new TurnRight(this.clientId))
    }

    if (event.key === 'a') {
      this.store.dispatch(new TurnLeft(this.clientId))
    }
  }
}
