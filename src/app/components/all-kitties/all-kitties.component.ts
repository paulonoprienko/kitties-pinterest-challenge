import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Kitty } from 'src/app/kitty';
import { FavoritesKittiesService } from 'src/app/services/favorites-kitties.service';
import { HttpService } from 'src/app/services/http.service';

interface KittyView {
  kitty: Kitty;
  isFavorite: boolean;
}

@Component({
  selector: 'app-all-kitties',
  templateUrl: './all-kitties.component.html',
  styleUrls: ['./all-kitties.component.css']
})
export class AllKittiesComponent implements OnInit, OnDestroy {

  public kittiesView: KittyView[] = [];
  private scrollObserver!: IntersectionObserver;
  @ViewChild('anchor') anchor!: ElementRef<HTMLElement>;

  constructor(
    private httpService: HttpService,
    private favoritesKittiesService: FavoritesKittiesService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void {
    this.scrollObserver = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        this.scrollObserver.unobserve(entry.target);

        this.httpService.getKitties().subscribe(data => {
          
          this.kittiesView.push(
            ...data.map(el => {
              return {
                kitty: el,
                isFavorite: this.favoritesKittiesService.hasInFavorites(el)
              }
            })
          );

          this.scrollObserver.observe(entry.target);
        });
      }
    },
    {});

    this.scrollObserver.observe(this.anchor.nativeElement);
  }

  ngOnDestroy(): void {
    this.scrollObserver.unobserve(this.anchor.nativeElement);
  }

  toggleLike(kittyView: KittyView): void {
    if(kittyView.isFavorite) {
      this.favoritesKittiesService.removeKittyFromFavorites(kittyView.kitty);
    }
    else {
      this.favoritesKittiesService.addKittyToFavorites(kittyView.kitty);
    }
    kittyView.isFavorite = !kittyView.isFavorite;
  }

}
