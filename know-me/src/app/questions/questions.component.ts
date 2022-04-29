import { Component, OnInit } from '@angular/core';
import { Question } from '../game-card/game-card.component';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  title: string = "Know me The Game 😈";

  questions: Question[] = [];
  
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(response => {
      this.questions = response as Question[];
      this.questions = this.questions.sort((a, b) => a.id - b.id);
    });
  }

  cardClicked(index: number): void {
    const question = this.questions[index];

    if (question.answered === false)   {
      question.answered = true;
    } else if (question.answered === true) {
      question.answered = false;
    }

    this.questionService.updateQuestion(question.id, question).subscribe(response => {
      setTimeout(() => {
        this.questions[index] = response;
        this.questions = this.questions.sort((a, b) => a.id - b.id);
      }, 400);
    })
  }
}
