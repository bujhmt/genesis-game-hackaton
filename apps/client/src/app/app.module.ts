import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FieldComponent} from './components/field/field.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,

    FieldComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
