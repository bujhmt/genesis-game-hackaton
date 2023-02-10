import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {SetTank} from './state/tanks.actions';
import {Events} from '@game/events';
import {Direction, Tank} from '@game/models';
import {io, Socket} from 'socket.io-client';
import {environment} from '../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {TanksState} from './state/tanks.state';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public socket: Socket;
  @Select(TanksState.tanks) public tanks$: Observable<Tank[]>;

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.socket = io(environment.baseUrl)

    this.socket.on('connect', () => {
      console.log('Connected to server!');

      const x = Math.ceil(Math.random() * 80 + 10);
      const y = Math.ceil(Math.random() * 40 + 10);

      const position = {
        x: x - (x % 20),
        y: y - (y % 20),
      };

      this.socket.emit(Events.SAVE, {
        id: this.socket.id,
        direction: Direction.TOP,
        position
      });

      this.socket.on(Events.SYNCHRONIZE, (tanks: Tank[]) => {
        console.log(`${Events.SYNCHRONIZE} event!`);
        this.store.dispatch(tanks.map((tank) => new SetTank(tank)));
      })
    });

    this.subscriptions.push(
      this.tanks$.subscribe((tanks) => {
        const clientTank = tanks.find((tank) => tank.id === this.socket.id);

        if (!clientTank) {
          return;
        }

        this.socket.emit(Events.SAVE, clientTank);
      })
    )
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }

    this.socket.close();
  }
}
