import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { singlePostResolver } from './resolvers/single-post.resolver';

import * as fromPosts from './+state/post/post.reducer';
import * as fromUsers from './+state/user/user.reducer';
import { PostEffects, UserEffects } from './+state';

export const featuresRoutes: Route[] = [
  {
    path: '',
    component: PostListComponent,
    providers: [
      provideState(fromPosts.POST_FEATURE_KEY, fromPosts.postReducer),
      provideEffects(PostEffects),
      provideState(fromUsers.USER_FEATURE_KEY, fromUsers.userReducer),
      provideEffects(UserEffects),
    ],
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: {
      routeResolver: singlePostResolver,
    },
  },
  {
    path: 'post',
    component: AddPostComponent,
  },
  {
    path: 'post/:id',
    component: SinglePostComponent,
    resolve: {
      routeResolver: singlePostResolver,
    },
  },
];
