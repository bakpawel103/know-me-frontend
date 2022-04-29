import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Question {
  id: number;
  name: String;
  description: String;
  answered: boolean;
}

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  animations: [
    trigger("cardFlip", [
      state(
        "false",
        style({
          transform: "none"
        })
      ),
      state(
        "true",
        style({
          transform: "rotateY(180deg)"
        })
      ),
      transition("false => true", [animate("400ms")]),
      transition("true => false", [animate("400ms")]),
    ])
  ]
})
export class GameCardComponent {
  @Input() data: any;
  
  @Output() cardClicked = new EventEmitter();
}
