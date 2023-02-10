import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {MoveBack, MoveForward, TurnLeft, TurnRight} from './state/tanks.actions';

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
