import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-randombot',
  templateUrl: './randombot.component.html',
  styleUrls: ['./randombot.component.css']
})
export class RandombotComponent implements OnInit {

  loaded = false;
  incomingMove: any;
  constructor() { }

  ngOnInit(): void {
    setTimeout( ()=>{
          this.loaded = true
      }, 100
    )
  }

  moveRequested($event: any) {
    let moves = $event.moves()
    let index = Math.floor(Math.random() * moves.length)
    this.incomingMove = moves[index]
  }
}
