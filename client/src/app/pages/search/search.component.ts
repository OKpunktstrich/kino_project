import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  searchQuery: string = '';
  searchInput: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.searchQuery = this.searchInput;
  }
}
