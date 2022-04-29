import { Component, OnInit } from '@angular/core';
import { Question } from '../game-card/game-card.component';
import { QuestionService } from '../question.service';

const COLUMNS_SCHEMA = [
  {
      key: "name",
      type: "String",
      label: "Nazwa"
  },
  {
      key: "description",
      type: "String",
      label: "Opis"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]

@Component({
  selector: 'app-questions-manager',
  templateUrl: './questions-manager.component.html',
  styleUrls: ['./questions-manager.component.scss']
})
export class QuestionsManagerComponent implements OnInit {
  dataSource: Question[] = [];
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);;
  columnsSchema: any = COLUMNS_SCHEMA;
  valid: any = {};

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(response => {
      this.dataSource = response as Question[];
      this.dataSource = this.dataSource.sort((a, b) => a.id - b.id);
    });
  }

  editRow(row: Question) {
    if (row.id === 0) {
      this.questionService.createQuestion(row).subscribe((newQuest: Question) => {
        row.id = newQuest.id;
        row.isEdit = false;
      });
    } else {
      this.questionService.updateQuestion(row.id, row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
    const newRow: Question = {
      id: 0,
      name: 'Pytanie ',
      description: '',
      answered: false,
      isEdit: true
    };
    this.dataSource = [newRow, ...this.dataSource];
  }

  removeRow(id: number) {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(
        (question: Question) => question.id !== id
      );
    });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }
}
