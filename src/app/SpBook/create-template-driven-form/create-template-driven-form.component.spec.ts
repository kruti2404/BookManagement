import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateDrivenFormComponent } from './create-template-driven-form.component';

describe('CreateTemplateDrivenFormComponent', () => {
  let component: CreateTemplateDrivenFormComponent;
  let fixture: ComponentFixture<CreateTemplateDrivenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTemplateDrivenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemplateDrivenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
