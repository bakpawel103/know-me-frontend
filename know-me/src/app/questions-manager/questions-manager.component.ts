import { Component, OnInit } from '@angular/core';
import { Question } from '../game-card/game-card.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { QuestionService } from '../services/question.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Deck } from '../game-deck/game-deck.component';

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'String',
    label: 'Nazwa',
  },
  {
    key: 'description',
    type: 'String',
    label: 'Opis',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-questions-manager',
  templateUrl: './questions-manager.component.html',
  styleUrls: ['./questions-manager.component.scss'],
})
export class QuestionsManagerComponent implements OnInit {
  decks: Deck[] = [];
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;
  valid: any = {};

  snackbarConfig: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'end',
  };

  constructor(
    private questionService: QuestionService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.userService
      .getDecks(this.tokenStorage.getUser().id)
      .subscribe((response) => {
        this.decks = response as Deck[];
        this.decks.forEach((deck) => {
          deck.questions = deck.questions.sort((a, b) => a.id - b.id);
        });
      });
  }

  editRow(deckSecretId: String, row: Question) {
    if (row.id === 0) {
      this.questionService
        .createQuestionInDeck(deckSecretId, row)
        .subscribe((newQuest: Question) => {
          row.id = newQuest.id;
          row.isEdit = false;

          this.snackBar.open(
            'Utworzono pytanie',
            undefined,
            this.snackbarConfig
          );

          this.userService
            .getDecks(this.tokenStorage.getUser().id)
            .subscribe((response) => {
              this.decks = response as Deck[];
              this.decks.forEach((deck) => {
                deck.questions = deck.questions.sort((a, b) => a.id - b.id);
              });
            });
        });
    } else {
      this.questionService.updateQuestion(row.id, row).subscribe(() => {
        row.isEdit = false;

        this.snackBar.open(
          'Edytowano pytanie z powodzeniem',
          undefined,
          this.snackbarConfig
        );

        this.userService
          .getDecks(this.tokenStorage.getUser().id)
          .subscribe((response) => {
            this.decks = response as Deck[];
            this.decks.forEach((deck) => {
              deck.questions = deck.questions.sort((a, b) => a.id - b.id);
            });
          });
      });
    }
  }

  addRow(secretId: String) {
    const newRow: Question = {
      id: 0,
      name: 'Pytanie ',
      description: '',
      answered: false,
      isEdit: true,
    };
    var foundDeck = this.decks.find((deck) => deck.secretId == secretId);

    if (foundDeck == undefined || foundDeck == null) {
      return;
    }

    foundDeck.questions = [newRow, ...foundDeck.questions];
  }

  removeRow(secretId: String, id: number) {
    this.questionService.deleteQuestion(id).subscribe(() => {
      var foundDeck = this.decks.find((deck) => deck.secretId == secretId);

      if (foundDeck == undefined || foundDeck == null) {
        return;
      }

      foundDeck.questions = foundDeck.questions.filter(
        (question: Question) => question.id !== id
      );

      this.snackBar.open(
        'Pytanie zostało usunięte',
        undefined,
        this.snackbarConfig
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

  removeDeck(secretId: String) {
    this.userService
      .deleteUserDeck(this.tokenStorage.getUser().id, secretId)
      .subscribe(() => {
        window.location.reload();
      });
  }
}
