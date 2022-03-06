import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  items: any;

  constructor() { }

  ngOnInit(): void {
    //Nav card
    this.items = [
      {
        label: 'Play Alone',
        info: 'Just a default chess board. Useful for studying positions or simulating puzzles',
        routerLink: ['/home']
      },

      {
        label: 'RandoBot',
        info: 'This bot will play random moves in response to your moves.',
        routerLink: ['/about']
      },
    ]
  }

}
