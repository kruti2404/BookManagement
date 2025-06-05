import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBookLayoutComponent } from './sp-book-layout.component';

describe('SpBookLayoutComponent', () => {
  let component: SpBookLayoutComponent;
  let fixture: ComponentFixture<SpBookLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpBookLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpBookLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
