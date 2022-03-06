import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChessboardComponent } from './chessboard.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {SplitterModule} from "primeng/splitter";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    ChessboardComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    ButtonModule,
    ScrollPanelModule,
    SplitterModule,
    TableModule,
  ],
  providers: [],
  exports: [
    ChessboardComponent
  ],
  bootstrap: [ChessboardComponent]
})
export class ChessboardModule { }
