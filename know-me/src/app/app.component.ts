import { Component } from '@angular/core';
import { CardData } from './types/CardData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flippedCards: number = 0;
  title: string = "Know me The Game 😈";

  cards: CardData[] = [
    {
      id: 0,
      name: "Question 1",
      description: "What is something you want to do together that we haven’t?",
      state: 'default'
    },
    {
      id: 1,
      name: "Question 2",
      description: "If you could gain one quality or ability, what would it be",
      state: 'default'
    },
    {
      id: 2,
      name: "Question 3",
      description: "What are your goals for this relationship?",
      state: 'default'
    },
    {
      id: 3,
      name: "Question 4",
      description: "What are you hoping to learn in the coming year?",
      state: 'default'
    },
    {
      id: 4,
      name: "Question 5",
      description: "Is there anything you’re hesitant to accomplish that I can help you with?",
      state: 'default'
    },
    {
      id: 5,
      name: "Question 6",
      description: "What is your favourite place?",
      state: 'default'
    },
    {
      id: 6,
      name: "Question 7",
      description: "What makes you feel most loved?",
      state: 'default'
    },
    {
      id: 7,
      name: "Question 8",
      description: "What is your favorite meal to share for a date night?",
      state: 'default'
    },
    {
      id: 8,
      name: "Question 9",
      description: "What physical and emotional gestures do you appreciate most?",
      state: 'default'
    },
    {
      id: 9,
      name: "Question 10",
      description: "What song do you think of when you think of me?",
      state: 'default'
    },
    {
      id: 10,
      name: "Question 11",
      description: "Is there anything you would change about yourself?",
      state: 'default'
    },
    {
      id: 11,
      name: "Question 12",
      description: "What are some of the things that you are most grateful for?",
      state: 'default'
    },
    {
      id: 12,
      name: "Question 13",
      description: "Do you trust me?",
      state: 'default'
    },
    {
      id: 13,
      name: "Question 14",
      description: "What does a balanced relationship look like to you?",
      state: 'default'
    },
    {
      id: 14,
      name: "Question 15",
      description: "Is there anything about me that you don’t currently know but want to?",
      state: 'default'
    },
    {
      id: 15,
      name: "Question 16",
      description: "What is your idea of a healthy relationship?",
      state: 'default'
    },
    {
      id: 16,
      name: "Question 17",
      description: "Does your family have any traditions?",
      state: 'default'
    },
    {
      id: 17,
      name: "Question 18",
      description: "What's your dream vacation?",
      state: 'default'
    },
    {
      id: 18,
      name: "Question 19",
      description: "Who was your first celebrity crush?",
      state: 'default'
    },
    {
      id: 19,
      name: "Question 20",
      description: "What is your favorite memory of our relationship?",
      state: 'default'
    },
    {
      id: 20,
      name: "Question 21",
      description: "What animal do you think I'd be?",
      state: 'default'
    },
    {
      id: 21,
      name: "Question 22",
      description: "Who is more likely to survive the Hunger Games—me or you?",
      state: 'default'
    },
    {
      id: 22,
      name: "Question 23",
      description: "What are your top 5 rules for life?",
      state: 'default'
    }
  ]

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default')   {
      cardInfo.state = 'flipped';
      this.flippedCards++;
    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards--;
    }

    if(this.flippedCards == this.cards.length) {
      this.title = "💕 Kocham Cię! 💕";
    }
  }
}
