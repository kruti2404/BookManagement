import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReactiveFormBookComponent } from './get-reactive-form-book.component';

describe('GetReactiveFormBookComponent', () => {
  let component: GetReactiveFormBookComponent;
  let fixture: ComponentFixture<GetReactiveFormBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReactiveFormBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReactiveFormBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
