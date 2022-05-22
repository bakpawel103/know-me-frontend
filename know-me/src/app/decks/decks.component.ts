import { Component, OnInit } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Deck } from '../game-deck/game-deck.component';
import { DeckService } from '../services/deck.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit {
  decks: Deck[] = [];

  snackbarConfig: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'end',
  };

  gridColumns = 6;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 6 ? 5 : 6;
  }

  constructor(
    private userService: UserService,
    private deckService: DeckService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public dialog: MatDialog
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
      });
  }

  cardClicked(id: any): void {
    this.router.navigate(['/questions'], {
      queryParams: { secret_id: id },
    });
  }

  addDeck(): void {
    const dialogRef = this.dialog.open(AddDeckDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }

      this.userService
        .addUserDeck(this.tokenStorage.getUser().id, result)
        .subscribe(() => {
          window.location.reload();
        });
    });
  }

  createDeck(): void {
    const dialogRef = this.dialog.open(CreateDeckDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }

      this.deckService
        .createDeck({
          secretId: uuid.v4(),
          name: result,
          questions: [],
        })
        .subscribe((result) => {
          this.userService
            .addUserDeck(this.tokenStorage.getUser().id, result.secretId)
            .subscribe(() => {
              window.location.reload();
            });
        });
    });
  }
}

@Component({
  selector: 'add-deck-dialog',
  templateUrl: './add-deck-dialog.html',
})
export class AddDeckDialog {
  secretId: String = '';

  constructor(public dialogRef: MatDialogRef<AddDeckDialog>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  change(event: any) {
    this.secretId = event.target.value;
  }

  addDeck(): void {
    this.dialogRef.close(this.secretId);
  }
}

@Component({
  selector: 'create-deck-dialog',
  templateUrl: './create-deck-dialog.html',
})
export class CreateDeckDialog {
  name: String = '';

  constructor(public dialogRef: MatDialogRef<CreateDeckDialog>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  changedName(event: any) {
    this.name = event.target.value;
  }

  createDeck(): void {
    this.dialogRef.close(this.name);
  }
}
