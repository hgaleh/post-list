import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';

describe('PostsService', () => {
  let service: PostsService;
  const httpClient = jasmine.createSpyObj('HttpClient', ['test']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClient
        }
      ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
