import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FieldComponent} from './components/field/field.component';
import {NgxsModule} from '@ngxs/store';
import {TanksState} from './state/tanks.state';
import {EditorModule} from "./editor/editor.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EditorModule,
    NgxsModule.forRoot([
      TanksState,
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
