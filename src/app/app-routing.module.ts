import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {HomeComponent} from "./home/home.component";
import {ChessboardComponent} from "./chessboard/chessboard.component"; // CLI imports router

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full',},
  {path: 'home', component: HomeComponent},
  {path: 'settings', component: HomeComponent},
  {path: 'chessboard', component: ChessboardComponent},
  {path: 'random_bot', component: ChessboardComponent},
  {path: 'about', component: MainComponent},
  {path: '**', redirectTo: '/home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
