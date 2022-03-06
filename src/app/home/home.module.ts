import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {SplitterModule} from "primeng/splitter";
import {ChessboardModule} from "../chessboard/chessboard.module";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    ButtonModule,
    ScrollPanelModule,
    SplitterModule,
    ChessboardModule,
    CardModule,
    PanelModule,
  ],
  providers: [],
  exports: [
    HomeComponent
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
