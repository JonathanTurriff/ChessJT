import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import {MenubarModule} from "primeng/menubar";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
  ],
  providers: [],
  exports: [
    MainComponent
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
