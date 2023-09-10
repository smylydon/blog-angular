import { TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FeaturesFacadeService } from './features-facade.service';
import { posts as PostsArray, users as UsersArray } from '../mocks';
import { Post, PostState } from './post';
import { UserEntity, UserState } from './user';
import { HelperService } from '../services/index';
import { Dictionary } from '@ngrx/entity';

describe('FeaturesFacadeService', () => {
  let service: FeaturesFacadeService;
  let store: MockStore<any>;
  const helper = new HelperService();
  const postsList: Post[] = helper.convertPostEntityToPost(PostsArray);
  const postIds: number[] = postsList.map((post: Post) => post.id);
  const userIds: number[] = UsersArray.map((user: UserEntity) => user.id);
  const postEntities: Dictionary<Post> = {};
  const userEntities: Dictionary<UserEntity> = {};

  const initialPostsState: PostState = {
    entities: postEntities,
    ids: postIds,
    loaded: true,
    error: null,
  };
  const initialUsersState: UserState = {
    entities: userEntities,
    ids: userIds,
    loaded: true,
    error: null,
  };

  postsList.forEach((post: Post) => {
    postEntities[post.id] = post;
  });
  UsersArray.forEach((user: UserEntity) => {
    userEntities[user.id] = user;
  });

  describe('Posts && Users not ready', () => {
    const posts: PostState = {
      entities: {},
      ids: [],
      loaded: false,
      error: null,
    };
    const users: UserState = {
      entities: {},
      ids: [],
      loaded: false,
      error: null,
    };

    const initialState = {
      posts,
      users,
    };
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          FeaturesFacadeService,
          Store,
          provideMockStore({ initialState }),
        ],
      });

      service = TestBed.inject(FeaturesFacadeService);
      store = TestBed.inject<any>(MockStore);
    }));

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return isReady as false', (done) => {
      service.isReady().subscribe((isReady: boolean) => {
        expect(isReady).toBe(false);
        done();
      });
    });

    it('should return isReady as true', (done) => {
      store.setState({
        posts: {
          entities: {},
          ids: [],
          loaded: true,
          error: null,
        },
        users: {
          entities: {},
          ids: [],
          loaded: true,
          error: null,
        },
      });
      service.isReady().subscribe((isReady: boolean) => {
        expect(isReady).toBe(true);
        done();
      });
    });
  });

  describe('Posts && Users are ready', () => {
    const initialState = {
      posts: initialPostsState,
      users: initialUsersState,
    };
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          FeaturesFacadeService,
          Store,
          provideMockStore({ initialState }),
        ],
      });

      service = TestBed.inject(FeaturesFacadeService);
      store = TestBed.inject<any>(MockStore);
    }));

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return isReady as true', (done) => {
      service.isReady().subscribe((isReady: boolean) => {
        expect(isReady).toBe(true);
        done();
      });
    });

    it('should return all posts from justUsers$', (done) => {
      service.justUsers$.subscribe((users: UserEntity[]) => {
        expect(users.length).toBe(10);
        done();
      });
    });

    it('should return all posts from justPosts$', (done) => {
      service.justPosts$.subscribe((posts: Post[]) => {
        expect(posts.length).toBe(100);
        done();
      });
    });

    it('should get all posts', (done) => {
      service.posts$.subscribe((posts: Post[]) => {
        expect(posts.length).toBe(100);
        done();
      });
    });

    it('should get post by id', (done) => {
      service.currentPostById('1').subscribe((post: Post | undefined) => {
        expect(post).toBeDefined();
        expect(post?.id).toEqual(1);
        done();
      });
    });
  });
});
