import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReactiveFormComponent } from './create-reactive-form.component';

describe('CreateReactiveFormComponent', () => {
  let component: CreateReactiveFormComponent;
  let fixture: ComponentFixture<CreateReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
