import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Kitty } from '../kitty';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesKittiesService {

  private favorites: Map<string, string> = new Map( JSON.parse( this.local.getItem('favorites') || '[]') );
  private changeTracker: BehaviorSubject<Map<string, string>> = new BehaviorSubject(this.favorites);
  changeTracker$: Observable<Map<string, string>> = this.changeTracker.asObservable();

  constructor(private local: LocalService) { }

  onChangeFavorites() {
    this.local.setItem(
      'favorites',
      JSON.stringify(Array.from(this.favorites))
    );
    this.changeTracker.next(this.favorites);
  }

  addKittyToFavorites(kitty: Kitty) {
    this.favorites.set(kitty.id, kitty.url);
    this.onChangeFavorites();
  }

  removeKittyFromFavorites(kitty: Kitty) {
    this.favorites.delete(kitty.id);
    this.onChangeFavorites();
  }

  removeAll() {
    this.favorites.clear();
    this.onChangeFavorites();
  }

  hasInFavorites(kitty: Kitty): boolean {
    return this.favorites.has(kitty.id);
  }
}
