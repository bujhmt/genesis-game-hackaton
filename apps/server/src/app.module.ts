import {Module} from '@nestjs/common';
import {AppGateway} from './app.gateway';
import {ScheduleModule} from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AppGateway],
})
export class AppModule {
}
