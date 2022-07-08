import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { isEmpty, omit, omitBy } from 'lodash';
import { Movie } from 'src/app/models/Movie';
import { MovieListResponse } from 'src/app/models/MovieListResponse';
import { Favorite, FavoriteService } from 'src/app/service/favorites.service';
import { MoviesService } from 'src/app/service/movies.service';

const apiKey = 'e33e4d9df9db49d5952b90b5cd790b63';
const language = 'de-CH'
const region = 'DE';

@Component({
  selector: 'app-movie-db-viewer',
  templateUrl: './movie-db-viewer.component.html',
  styleUrls: ['./movie-db-viewer.component.scss']
})
export class MovieDbViewerComponent implements OnChanges {
  movieList: Movie[] = [];
  favorites: number[] = [];
  genres: {id: number, name: string}[] = [];

  @Input()
  queryType: 'now_playing' | 'top_rated' | 'search' | 'discover' = 'discover';

  @Input()
  sortBy: 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc' = 'popularity.desc';

  @Input()
  withGenres: number[] = [];

  @Input()
  searchQuery: string = '';

  constructor(private http: HttpClient, private movieService: MoviesService, private favoriteService: FavoriteService) { }

  onFavorite(movieId: number): void {
    if (this.favorites.includes(movieId)) {
      this.favoriteService.removeFavorite(movieId).subscribe(data => this.favorites = this.favorites.filter(f => f !== data.id));
      return;
    }
    this.favoriteService.addFavorite(movieId).subscribe(data => this.favorites.push(data.id));
  }

  loadData(): void {
    switch(this.queryType) {
      case 'discover':
        this.movieService.getDiscover({sortBy: this.sortBy, genres: this.withGenres, query: this.searchQuery}).subscribe(data => {
          this.movieList = data.results;
        });
        break;
      case 'search':
          if (!isEmpty(this.searchQuery)) {
            this.movieService.searchMovies({sortBy: this.sortBy, genres: this.withGenres, query: this.searchQuery}).subscribe(data => {
              this.movieList = data.results;
            });
          }
          break;
      case 'now_playing':
        this.movieService.getNowPlayingMovies().subscribe(data => {
          this.movieList = data.results;
      });
      break;
      case 'top_rated':
        this.movieService.getTopRatedMovies().subscribe(data => {
            this.movieList = data.results;
        });
        break;
    }
    this.favoriteService.getFavorites().subscribe(data => {
      this.favorites = data.map((f: Favorite) => f.id);
    });
    this.movieService.getGenres().subscribe(data => {
      this.genres = data.genres;
    });
  }

  getGenreName(id: number) {
    return this.genres.find(g => g.id === id)?.name || id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }



  ngOnInit(): void {
    this.loadData();
  }

}
