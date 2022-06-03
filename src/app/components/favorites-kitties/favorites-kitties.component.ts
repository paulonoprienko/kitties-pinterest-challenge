import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Kitty } from 'src/app/kitty';
import { FavoritesKittiesService } from 'src/app/services/favorites-kitties.service';

@Component({
  selector: 'app-favorites-kitties',
  templateUrl: './favorites-kitties.component.html',
  styleUrls: ['./favorites-kitties.component.css']
})
export class FavoritesKittiesComponent implements OnInit, OnDestroy {

  public kitties!: Kitty[];
  private favoritesTrackerSub!: Subscription;

  constructor(private favoritesKittiesService: FavoritesKittiesService) { }

  ngOnInit(): void {
    this.favoritesTrackerSub = this.favoritesKittiesService.changeTracker$.subscribe(favorites => {
      this.kitties = Array.from( favorites, ([id, url]) => ({id, url}) ).reverse();
    });

    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.favoritesTrackerSub.unsubscribe();
  }

  toRemove(kitty: Kitty): void {
    this.favoritesKittiesService.removeKittyFromFavorites(kitty);
  }

}
