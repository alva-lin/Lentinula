import { TestBed } from '@angular/core/testing';

import { WrapperInterceptor } from './wrapper.interceptor';

describe('WrapperInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WrapperInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: WrapperInterceptor = TestBed.inject(WrapperInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
