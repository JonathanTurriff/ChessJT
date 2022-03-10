import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-randombot',
  templateUrl: './randombot.component.html',
  styleUrls: ['./randombot.component.css']
})
export class RandombotComponent implements OnInit {

  loaded = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout( ()=>{
          this.loaded = true
      }, 300
    )
  }

}
