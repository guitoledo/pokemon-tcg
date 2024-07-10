import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IgxCardModule, IgxCheckboxModule, IgxDialogComponent, IgxDialogModule, IgxSnackbarComponent } from 'igniteui-angular';
import { PokemonTcgService } from '../../../services/pokemon-tcg.service';

@Component({
  selector: 'app-create-deck-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IgxCheckboxModule, IgxCardModule, IgxDialogModule, IgxSnackbarComponent],
  templateUrl: './create-deck-modal.component.html',
  styleUrls: ['./create-deck-modal.component.scss']
})
export class CreateDeckModalComponent {
  public cards$: Observable<any[]>;
  public createDeckForm: FormGroup;
  public isDeckNameInvalid: boolean = false;

  @ViewChild(IgxDialogComponent, { static: true }) public dialog?: IgxDialogComponent;
  @ViewChild(IgxSnackbarComponent, { static: true }) public snackbar?: IgxSnackbarComponent;


  @Output() deckCreated = new EventEmitter<{ deckName: string, selectedCards: any[] }>();

  constructor(private fb: FormBuilder, private pokemonTcgService: PokemonTcgService) {
    this.cards$ = this.pokemonTcgService.getCards();
    this.createDeckForm = this.fb.group({
      deckName: ['', Validators.required],
      selectedCards: this.fb.array([], [Validators.required, Validators.minLength(24), Validators.maxLength(60)])
    });
  }

  get selectedCards(): FormArray {
    return this.createDeckForm.get('selectedCards') as FormArray;
  }

  public open(deck?: { deckName: string, selectedCards: any[] }) {
    if (deck) {
      this.createDeckForm.patchValue({ deckName: deck.deckName });
      this.selectedCards.clear();
      deck.selectedCards.forEach(card => {
        this.selectedCards.push(this.fb.control(card));
      });
    } else {
      this.resetForm();
    }
    this.dialog?.open();
  }

  public onSubmit() {
    if (this.selectedCards.length > 60) {
      this.snackbar?.open('O baralho deve ter no máximo 60 cartas.');
      return;
    }
  
    if (this.createDeckForm.valid) {
      this.deckCreated.emit({
        deckName: this.createDeckForm.value.deckName,
        selectedCards: this.selectedCards.value
      });
      this.dialog?.close();
    }
  }

  public onDeckNameBlur() {
    this.isDeckNameInvalid = this.createDeckForm.get('deckName')?.invalid && this.createDeckForm.get('deckName')?.touched || false;
  }

  public isCardSelected(card: any): boolean {
    return this.selectedCards.value.some((c: any) => c.id === card.id);
  }

  public toggleCardSelection(card: any) {
    const selectedCards = this.selectedCards;
    const cardsWithSameName = selectedCards.value.filter((c: any) => c.name === card.name);

    if (cardsWithSameName.length < 4) {
        selectedCards.push(this.fb.control(card));
    } else {
        card.showWarning = true;
    }

    this.createDeckForm.updateValueAndValidity();
  }

  public removeCard(card: any, event: Event) {
    event.stopPropagation();
    const selectedCards = this.selectedCards;
    const index = selectedCards.value.findIndex((c: any) => c.id === card.id);

    if (index !== -1) {
      selectedCards.removeAt(index);
    }

    this.createDeckForm.updateValueAndValidity();
  }

  public resetForm() {
    this.createDeckForm.reset();
    this.selectedCards.clear();
  }
}
