import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  queryParams: string = '&region=DE&sort_by=popularity.desc';

  constructor() { }

  ngOnInit(): void {
  }

}
