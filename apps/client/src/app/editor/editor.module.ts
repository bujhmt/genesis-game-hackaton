import { NgModule } from '@angular/core';
import {EditorComponentComponent} from "./components/editor/editor.component";
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [EditorComponentComponent],
  imports: [MonacoEditorModule, FormsModule],
  providers: [],
  bootstrap: [],
  exports: [
    EditorComponentComponent
  ]
})
export class EditorModule {}
