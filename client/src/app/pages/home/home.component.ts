import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  path: string = '/movie/now_playing';

  queryParams: string = '&region=DE';

  constructor() { }

  ngOnInit(): void {
  }

}
