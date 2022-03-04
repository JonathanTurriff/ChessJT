import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {SplitterModule} from "primeng/splitter";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    ButtonModule,
    ScrollPanelModule,
    SplitterModule,
  ],
  providers: [],
  exports: [
    MainComponent
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
