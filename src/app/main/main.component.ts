import { Component, OnInit } from '@angular/core';

declare var ChessBoard: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  items: any;
  board: any;
  game: any;
  // board2: any;
  ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';

  constructor() { }


  ngOnInit(): void {
    this.board = ChessBoard('board1', {showNotation: true, position: this.ruyLopez, draggable: true})
    // this.board2 = ChessBoard('board2', {showNotation: true, position: 'start', draggable: true})
    this.items = [
      {
        label: 'Bots',
        icon: 'pi pi-user',
        items: [
          {label: 'JawnBotV1', icon: 'pi pi-android',},
        ]
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      }
      ];
  }

  clearBoard() {
    this.board.clear()
    this.board.start()
  }

  flipBoard() {
    this.board.flip()
  }
}
