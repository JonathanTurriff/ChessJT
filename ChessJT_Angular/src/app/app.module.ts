import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {MainModule} from "./main/main.module";
import {RouterModule} from "@angular/router";
import { RandombotComponent } from './randombot/randombot.component';
import {ChessboardModule} from "./chessboard/chessboard.module";
import { HomepageComponent } from './homepage/homepage.component';
import {CardModule} from "primeng/card";
import { SandboxComponent } from './sandbox/sandbox.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    RandombotComponent,
    HomepageComponent,
    SandboxComponent,
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MainModule,
    ChessboardModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
