import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBookDetailsComponent } from './get-book-details.component';

describe('GetBookDetailsComponent', () => {
  let component: GetBookDetailsComponent;
  let fixture: ComponentFixture<GetBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBookDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
