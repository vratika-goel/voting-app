import { TestBed } from '@angular/core/testing';

import { DataParserApiService } from './data-parser-api.service';

describe('DataParserApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataParserApiService = TestBed.get(DataParserApiService);
    expect(service).toBeTruthy();
  });
});
