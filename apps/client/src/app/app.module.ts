import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FieldComponent} from './components/field/field.component';
import {NgxsModule} from '@ngxs/store';
import {TanksState} from './state/tanks.state';

@NgModule({
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      TanksState,
    ])
  ],
  declarations: [
    AppComponent,
    FieldComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
