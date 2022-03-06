import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  items: any;
  test: any = [1,2,3,4,5,6,7,8,9,0]

  constructor(private route: ActivatedRoute,
              protected router: Router) {}

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

  redirectTo(path: string) {
    this.router.navigate(['../'+path], {relativeTo: this.route});
  }
}
