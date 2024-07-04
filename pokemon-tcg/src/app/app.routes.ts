import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/pokemon-list', pathMatch: 'full' },
    { path: 'pokemon-list', component: PokemonListComponent },
];
