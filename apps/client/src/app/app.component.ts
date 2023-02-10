import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {MoveBack, MoveForward, SetTank, TurnLeft, TurnRight} from './state/tanks.actions';
import {Direction} from "@game/models";

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  clientId = 'client';

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new SetTank({
      id: this.clientId,
      position: {x:20,y:20},
      direction: Direction.RIGHT
    }))
  }
}
