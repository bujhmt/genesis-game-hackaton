import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetTank} from './state/tanks.actions';
import {Events} from '@game/events';
import {Direction, Tank} from '@game/models';
import {io} from 'socket.io-client';
import {environment} from '../environments/environment';

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
    const socket = io(environment.baseUrl)

    socket.on('connect', () => {
      console.log('Connected to server!');

      const x = Math.ceil(Math.random() * 80 + 10);
      const y = Math.ceil(Math.random() * 40 + 10);

      const position = {
        x: x - (x % 20),
        y: y - (y % 20),
      };

      socket.emit(Events.SAVE, {
        id: socket.id,
        direction: Direction.TOP,
        position
      });

      socket.on(Events.SYNCHRONIZE, (tanks: Tank[]) => {
        console.log(`${Events.SYNCHRONIZE} event!`);
        this.store.dispatch(tanks.map((tank) => new SetTank(tank)));
      })
    });
  }
}
