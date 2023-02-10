import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {MoveForward} from './state/tanks.actions';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.store.dispatch()
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'w') {
      this.store.dispatch(new MoveForward())
    }
  }
}
