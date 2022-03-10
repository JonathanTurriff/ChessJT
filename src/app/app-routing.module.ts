import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RandombotComponent} from "./randombot/randombot.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {SandboxComponent} from "./sandbox/sandbox.component"; // CLI imports router

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full',},
  {path: 'home', component: HomepageComponent},
  {path: 'settings', component: HomepageComponent},
  {path: 'chessboard', component: SandboxComponent},
  {path: 'random_bot', component: RandombotComponent},
  {path: 'about', component: HomepageComponent},
  {path: '**', redirectTo: '/home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
