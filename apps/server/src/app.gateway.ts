import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {Tank} from '@game/models';
import {Socket} from 'socket.io-client';
import {Logger} from '@nestjs/common';
import {Events} from '@game/events';
import {Cron} from '@nestjs/schedule';

@WebSocketGateway({cors: {origin: '*'}})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AppGateway.name);
  private readonly tanksMap = new Map<string, Tank>();

  @WebSocketServer() server: Server;

  @SubscribeMessage(Events.SAVE)
  save(@MessageBody() tank: Tank, @ConnectedSocket() socket: Socket) {
    this.tanksMap.set(socket.id, tank);
    this.logger.log(`${socket.id} saved!`);
  }

  @Cron('* * * * * *')
  synchronize() {
    this.logger.log(`${Events.SYNCHRONIZE}. Tanks: ${this.tanksMap.size}.`);
    this.server.emit(Events.SYNCHRONIZE, Array.from(this.tanksMap.values()));
  }

  handleConnection(socket: Socket) {
    this.logger.log(`New connection! Id: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket was disconnected! Id: ${socket.id}`);

    if (this.tanksMap.has(socket.id)) {
      this.tanksMap.delete(socket.id)
    }
  }
}
