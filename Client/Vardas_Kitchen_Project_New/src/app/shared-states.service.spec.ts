import { TestBed, inject } from '@angular/core/testing';

import { SharedStatesService } from './shared-states.service';

describe('SharedStatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedStatesService]
    });
  });

  it('should be created', inject([SharedStatesService], (service: SharedStatesService) => {
    expect(service).toBeTruthy();
  }));
});
