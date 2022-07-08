import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './pages/home/home.component';
import { TopRatedComponent } from './pages/top-rated/top-rated.component';
import { PopularComponent } from './pages/popular/popular.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDbViewerComponent } from './components/movie-db-viewer/movie-db-viewer.component';
import { FilterComponent } from './pages/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieComponent } from './pages/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopRatedComponent,
    PopularComponent,
    FavoritesComponent,
    SearchComponent,
    MovieDbViewerComponent,
    FilterComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
