import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Genre } from 'src/app/models/Genre';
import { GenreResponse } from 'src/app/models/GenreResponse';

const queryParams = 'api_key=e33e4d9df9db49d5952b90b5cd790b63&language=de-CH'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  withGenres: number[] = [28,12,10751,35];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genreFormCtrl = new FormControl('');
  filteredGenres: Observable<string[]>;
  genres: string[] = [];
  allGenres: string[] = [];
  movieDBGenres: Genre[] = [];

  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient) {
    this.filteredGenres = this.genreFormCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => (genre ? this._filter(genre) : this.noGenreDuplicate())),
    );
  }
  ngOnInit(): void {
    this.http.get<GenreResponse>(`https://api.themoviedb.org/3/genre/movie/list?${queryParams}`).subscribe(data => {
        this.movieDBGenres = data.genres;
        this.allGenres = data.genres.map(g => g.name);
    });
  }

  noGenreDuplicate(): string[] {
    return this.allGenres.slice().filter(f => !this.genres.includes(f))
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our genre
    if (this.allGenres.includes(value)) {
      this.genres.push(value);
      this.withGenres = this.genres.map(genreName => this.movieDBGenres?.find(genre => genre.name === genreName)?.id)
    }

    // Clear the input value
    event.chipInput!.clear();

    this.genreFormCtrl.setValue(null);
  }

  remove(genre: string): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
      this.withGenres = this.genres.map(genreName => this.movieDBGenres?.find(genre => genre.name === genreName)?.id)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.viewValue);
    this.withGenres = this.genres.map(genreName => this.movieDBGenres?.find(genre => genre.name === genreName)?.id)
    this.genreInput.nativeElement.value = '';
    this.genreFormCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(genre => genre.toLowerCase().includes(filterValue));
  }

}
