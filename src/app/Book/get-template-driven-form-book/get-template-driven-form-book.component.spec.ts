import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTemplateDrivenFormBookComponent } from './get-template-driven-form-book.component';

describe('GetTemplateDrivenFormBookComponent', () => {
  let component: GetTemplateDrivenFormBookComponent;
  let fixture: ComponentFixture<GetTemplateDrivenFormBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTemplateDrivenFormBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTemplateDrivenFormBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
