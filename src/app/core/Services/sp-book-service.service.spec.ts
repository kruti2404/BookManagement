import { TestBed } from '@angular/core/testing';

import { SpBookServiceService } from './sp-book-service.service';

describe('SpBookServiceService', () => {
  let service: SpBookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpBookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
