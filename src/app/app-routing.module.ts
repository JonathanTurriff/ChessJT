import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component"; // CLI imports router

const routes: Routes = [
// {
//     path: '',
//     redirectTo: '/main',
//     pathMatch: 'full',
//     component: MainComponent
// },
{
    path: 'main',
    component: MainComponent
}
]
 // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
