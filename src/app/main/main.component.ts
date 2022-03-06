import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  items: any;

  constructor() { }

  ngOnInit(): void {
    //NavBar Setup
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home']
      },
      {
        label: 'Bots',
        icon: 'pi pi-user',
        items: [
          {
            label: 'RandomBot',
            icon: 'pi pi-android',
            routerLink: ['/random_bot']
          }
        ]
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        routerLink: ['/about']
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: ['/settings']
      }];
  }

}
