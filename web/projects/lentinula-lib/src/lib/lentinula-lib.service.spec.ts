import { TestBed } from '@angular/core/testing';

import { LentinulaLibService } from './lentinula-lib.service';

describe('LentinulaLibService', () => {
  let service: LentinulaLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LentinulaLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
