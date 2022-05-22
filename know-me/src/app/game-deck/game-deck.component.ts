import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../game-card/game-card.component';

export interface Deck {
  secretId: String;
  name: String;
  questions: Question[];
}

@Component({
  selector: 'app-game-deck',
  templateUrl: './game-deck.component.html',
  styleUrls: ['./game-deck.component.scss'],
})
export class GameDeckComponent {
  @Input() data: any;

  @Output() cardClicked = new EventEmitter();
}
