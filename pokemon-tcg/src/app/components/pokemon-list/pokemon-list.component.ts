import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonTcgService } from '../../../services/pokemon-tcg.service';
import { IgxButtonModule, IgxCardModule, IgxDialogModule } from 'igniteui-angular';
import { CommonModule } from '@angular/common';
import { CreateDeckModalComponent } from '../create-deck-modal/create-deck-modal.component';

interface Deck {
  deckName: string;
  cards: any[];
}

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, IgxCardModule, IgxButtonModule, IgxDialogModule, CreateDeckModalComponent],
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  public cards$: Observable<any[]> = of ([]);
  public selectedDeck: any[] = [];
  public deckName: string = '';
  public decks: Deck[] = [];
  public viewMode: 'list' | 'decks' = 'list';

  private editingDeckIndex: number | null = null;

  public pokemonCount: number = 0;
  public trainerCount: number = 0;
  public uniqueTypesCount: number = 0;

  @ViewChild('createDeckModal', { static: true }) private createDeckModal?: CreateDeckModalComponent;

  constructor(private pokemonTcgService: PokemonTcgService) {}

  ngOnInit(): void {
    this.cards$ = this.pokemonTcgService.getCards();
  }

  public onCreateDeck() {
    this.editingDeckIndex = null;
    this.createDeckModal?.open();
  }

  public onDeckCreated(event: { deckName: string, selectedCards: any[] }) {
    if (this.editingDeckIndex !== null) {
      this.decks[this.editingDeckIndex] = {
        deckName: event.deckName,
        cards: event.selectedCards
      };
    } else {
      this.decks.push({
        deckName: event.deckName,
        cards: event.selectedCards
      });
      this.viewMode = 'decks'; 
    }
    this.deckName = '';
    this.selectedDeck = [];
    this.editingDeckIndex = null;
  }

  public onEditDeck(deck: Deck, index: number) {
    this.editingDeckIndex = index;
    this.createDeckModal?.open({ deckName: deck.deckName, selectedCards: deck.cards });
  }

  public onRemoveDeck(deckIndex: number) {
    this.decks.splice(deckIndex, 1);
    if (this.decks.length === 0) {
      this.viewMode = 'list'; 
    }
  }
}