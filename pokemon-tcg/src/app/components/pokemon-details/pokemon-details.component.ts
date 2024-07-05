import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxCardModule, IgxDialogComponent, IgxDialogModule, IgxIconModule } from 'igniteui-angular';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, IgxCardModule, IgxDialogModule, IgxIconModule],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
  public deckName: string = '';
  public cards: any[] = [];

  public pokemonCount: number = 0;
  public trainerCount: number = 0;
  public uniqueTypesCount: number = 0;
  public uniqueColorsCount: number = 0;

  @ViewChild(IgxDialogComponent, { static: true }) public dialog?: IgxDialogComponent;

  public open(deck: { deckName: string, cards: any[] }) {
    this.deckName = deck.deckName;
    this.cards = deck.cards;
    this.calculateDeckStatistics();
    this.dialog?.open();
  }

  public closeDialog() {
    this.dialog?.close();
  }

  private calculateDeckStatistics() {
    this.pokemonCount = this.cards.filter(card => card.supertype === 'Pokémon').length;
    this.trainerCount = this.cards.filter(card => card.supertype === 'Trainer').length;
    this.uniqueTypesCount = new Set(this.cards.flatMap(card => card.supertype)).size;
    this.uniqueColorsCount = new Set(this.cards.flatMap(card => card.types)).size;
  }
}
