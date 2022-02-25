import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    ButtonModule,
  ],
  providers: [],
  exports: [
    MainComponent
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
