import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromPosts from './+state/post/post.reducer';
import * as fromUsers from './+state/user/user.reducer';
import { PostEffects } from './+state/post/post.effects';

import { FeaturesRoutingModule } from './lib.routes';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { UserEffects } from './+state/user/user.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    StoreModule.forFeature(fromPosts.POST_FEATURE_KEY, fromPosts.reducer),
    StoreModule.forFeature(fromUsers.USER_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([PostEffects, UserEffects]),
  ],
  declarations: [
    PostListComponent,
    AddPostComponent,
    SinglePostComponent,
    EditPostComponent,
  ],
})
export class FeaturesModule {}
