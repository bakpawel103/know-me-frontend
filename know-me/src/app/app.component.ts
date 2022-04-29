import { Component, OnInit } from '@angular/core';
import { Question } from './game-card/game-card.component';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = "Know me The Game 😈";

  questions: Question[] = [];
  
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(response => {
      console.log(response);
    });
  }

  cardClicked(index: number): void {
    const quersion = this.questions[index];

    if (quersion.answered === false)   {
      quersion.answered = true;
    } else if (quersion.answered === true) {
      quersion.answered = false;
    }

    if(this.questions.filter(x => x.answered).length == this.questions.length) {
      this.title = "💕 Kocham Cię! 💕";
    }
  }
}
