import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Post, PostEntity } from '../+state/post/post.model';
import { HelperService } from './../services/index';

import { posts as PostsArray } from '../mocks/mockPosts';
import { singlePostResolver } from './single-post.resolver';
import { FeaturesFacadeService } from '../+state';

describe('singlePostResolver', () => {
  const helper = new HelperService();
  const posts: Post[] = helper.convertPostEntityToPost(PostsArray);

  const executeResolver: ResolveFn<Observable<Post | undefined>> = (
    ...resolverParameters
  ) => {
    return TestBed.runInInjectionContext(() =>
      singlePostResolver(...resolverParameters)
    );
  };

  let mockPost: Post;
  let facade: FeaturesFacadeService;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  const createMockObjects = (value: number) => {
    const post: PostEntity = posts[value - 1];
    mockPost = <Post>Object.assign({}, post);
    mockRoute = {
      params: { id: value },
    } as unknown as ActivatedRouteSnapshot;
    mockState = {
      url: `post/${value}`,
    } as RouterStateSnapshot;
  };

  [1, 2, 9, 14].forEach((value) => {
    describe(`post/${value}`, () => {
      beforeEach(() => {
        createMockObjects(value);
        TestBed.configureTestingModule({
          providers: [
            {
              provide: FeaturesFacadeService,
              useValue: { currentPostById: jest.fn(() => of(mockPost)) },
            },
          ],
        });
        facade = TestBed.inject(FeaturesFacadeService);
      });

      it('should return the requested post', (done) => {
        const result = executeResolver(mockRoute, mockState);
        expect(facade.currentPostById).toHaveBeenCalled();
        expect(facade.currentPostById).toHaveBeenCalledWith(value);
        (result as Observable<Post | undefined>).subscribe(
          (post: Post | undefined) => {
            console.log(post?.id, mockPost.id);
            expect(post).toBe(mockPost);
            expect(post?.id).toBe(value);
            expect(post?.id).toBe(mockPost.id);
            expect(post?.title).toBe(mockPost.title);
            expect(post?.body).toBe(mockPost.body);
            done();
          }
        );
      });
    });
  });
});
