import { Component, OnInit } from '@angular/core';
import { Favorite, FavoriteService } from 'src/app/service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: number[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe(data => {
      this.favorites = data.map((f: Favorite) => f.id);
    });
  }

}
