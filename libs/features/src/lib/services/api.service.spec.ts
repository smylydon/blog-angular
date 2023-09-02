import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { posts as PostsArray, users as UsersArray } from '../mocks/mocks';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPosts', () => {
    service.getPosts().subscribe((res) => {
      expect(res).toEqual(PostsArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `posts`,
    });

    req.flush(PostsArray);
  });

  it('should getUsers', () => {
    service.getUsers().subscribe((res) => {
      expect(res).toEqual(UsersArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `users`,
    });

    req.flush(UsersArray);
  });
});
