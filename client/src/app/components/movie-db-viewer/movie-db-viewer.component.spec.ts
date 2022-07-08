import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDbViewerComponent } from './movie-db-viewer.component';

describe('MovieDbViewerComponent', () => {
  let component: MovieDbViewerComponent;
  let fixture: ComponentFixture<MovieDbViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDbViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDbViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
