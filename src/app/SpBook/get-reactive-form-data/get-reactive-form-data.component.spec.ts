import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReactiveFormDataComponent } from './get-reactive-form-data.component';

describe('GetReactiveFormDataComponent', () => {
  let component: GetReactiveFormDataComponent;
  let fixture: ComponentFixture<GetReactiveFormDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReactiveFormDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReactiveFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
