import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private apiUrl = 'https://api.pokemontcg.io/v1/cards';

  constructor(private http: HttpClient) {
  }

  public getCards(params?: any): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params }).pipe(map(response => response.cards));
  }
}