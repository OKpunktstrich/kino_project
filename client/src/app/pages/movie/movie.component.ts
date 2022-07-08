import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  private routeSub: Subscription;
  movie: Movie;

  constructor(private route: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.movieService.getMovieDetails(params['id']).subscribe(data => this.movie = data);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
