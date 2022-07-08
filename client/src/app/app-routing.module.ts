import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FilterComponent } from './pages/filter/filter.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { PopularComponent } from './pages/popular/popular.component';
import { SearchComponent } from './pages/search/search.component';
import { TopRatedComponent } from './pages/top-rated/top-rated.component';

const routes: Routes = [
  { title: 'Home', path: '', component: HomeComponent },
  { title: 'Best bewerteten Filme', path: 'top-rated', component: TopRatedComponent },
  { title: 'Populärsten Filme', path: 'popular', component: PopularComponent },
  { title: 'Favoriten', path: 'favorites', component: FavoritesComponent },
  { title: 'Suche', path: 'search', component: SearchComponent },
  { title: 'Filter', path: 'filter', component: FilterComponent},
  { title: 'Movie', path: 'movie/:id', component: MovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
