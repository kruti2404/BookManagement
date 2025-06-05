import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTemplateDrivenDataComponent } from './get-template-driven-data.component';

describe('GetTemplateDrivenDataComponent', () => {
  let component: GetTemplateDrivenDataComponent;
  let fixture: ComponentFixture<GetTemplateDrivenDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTemplateDrivenDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTemplateDrivenDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
