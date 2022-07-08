import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { isEmpty, omitBy } from 'lodash';
import { MovieListResponse } from '../models/MovieListResponse';

export type SortBy = 'popularity.asc'
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
| 'vote_count.desc';

export interface AdditionalQueryParams {
  page?: number;
  sortBy?: SortBy;
  genres?: number[];
  query?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'e33e4d9df9db49d5952b90b5cd790b63';
    this.language = 'de-CH';
    this.region = 'DE';
  }

  getQueryParams({page, sortBy = 'popularity.desc', genres, query}: AdditionalQueryParams = {}) {
    return new URLSearchParams(omitBy({
      api_key: this.apiKey,
      language: this.language,
      region: this.region,
      sort_by: sortBy,
      with_genres: genres?.join(','),
      query: query
    }, isEmpty)).toString();
  }

  getDiscover(options: AdditionalQueryParams): Observable<any> {
    return this.http.get<MovieListResponse>(`${this.baseUrl}discover/movie?${this.getQueryParams(options)}`);
  }

  searchMovies(options: AdditionalQueryParams): Observable<any> {
    return this.http.get(`${this.baseUrl}search/movie?${this.getQueryParams(options)}`);
  }

  getTopRatedMovies(page?: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/top_rated?${this.getQueryParams({page})}`);
  }

  getNowPlayingMovies(page?: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/now_playing?${this.getQueryParams({page})}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/movie/list?${this.getQueryParams()}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<MovieListResponse>(`${this.baseUrl}movie/${id}?${this.getQueryParams()}`);
  }
}
