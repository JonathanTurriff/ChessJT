import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChessboardComponent } from './chessboard.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {SplitterModule} from "primeng/splitter";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    ChessboardComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    BrowserAnimationsModule,
    ButtonModule,
    ScrollPanelModule,
    SplitterModule,
    TableModule,
    DialogModule,
  ],
  providers: [],
  exports: [
    ChessboardComponent
  ],
  bootstrap: [ChessboardComponent]
})
export class ChessboardModule { }
