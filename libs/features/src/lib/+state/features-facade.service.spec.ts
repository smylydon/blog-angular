import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Observable, of } from 'rxjs';
import { FeaturesFacadeService } from './features-facade.service';
import { posts as PostsArray, users as UsersArray } from '../mocks';
import { Post, PostEntity } from './post';
import { UserEntity } from './user';

describe('FeaturesFacadeService', () => {
  let service: FeaturesFacadeService;
  let store: MockStore<any>;
  let justPostsSpyReturnValue;
  let justUsersSpyReturnValue;

  let justPostsSpy;
  let justUsersSpy;
  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturesFacadeService, provideMockStore({ initialState })],
    });

    service = TestBed.inject(FeaturesFacadeService);
    store = TestBed.inject<any>(Store);

    // justPostsSpyReturnValue = jest
    //   .spyOn(service, 'justPosts$', 'subscribe')
    //   .mockReturnValue(of(<Post[]>PostsArray));
    // justUsersSpyReturnValue = jest
    //   .spyOn(service, 'justUsers$', 'get')
    //   .mockReturnValue(of(<UserEntity[]>UsersArray));

    //justPostsSpy = jest.spyOn(service, 'justPosts$');
    //justUsersSpy = jest.spyOn(service, 'justUsers$');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
