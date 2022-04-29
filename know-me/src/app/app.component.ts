import { Component, OnInit } from '@angular/core';
import { CardData } from './types/CardData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  flippedCards: number = 0;
  title: string = "Know me The Game 😈";

  cards: CardData[] = [];
  
  ngOnInit(): void {

  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.answered === false)   {
      cardInfo.answered = true;
      this.flippedCards++;
    } else if (cardInfo.answered === true) {
      cardInfo.answered = false;
      this.flippedCards--;
    }

    if(this.flippedCards == this.cards.length) {
      this.title = "💕 Kocham Cię! 💕";
    }
  }
}
