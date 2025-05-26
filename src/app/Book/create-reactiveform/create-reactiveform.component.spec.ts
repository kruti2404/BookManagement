import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReactiveformComponent } from './create-reactiveform.component';

describe('CreateReactiveformComponent', () => {
  let component: CreateReactiveformComponent;
  let fixture: ComponentFixture<CreateReactiveformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReactiveformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReactiveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
