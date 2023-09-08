import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromPosts from './+state/post/post.reducer';
import * as fromUsers from './+state/user/user.reducer';
import { FeaturesFacadeService, PostEffects, UserEffects } from './+state';

import { FeaturesRoutingModule } from './features.routes';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactionButtonsComponent } from './reaction-buttons/reaction-buttons.component';
import { TimeAgoComponent } from './time-ago/time-ago.component';

import { ApiService } from './services';

import { ReactionButtonCountPipe, TimeAgoPipe } from './pipes';
import { APostComponent } from './a-post/a-post.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    StoreModule.forFeature(fromPosts.POST_FEATURE_KEY, fromPosts.postReducer),
    StoreModule.forFeature(fromUsers.USER_FEATURE_KEY, fromUsers.userReducer),
    EffectsModule.forFeature([PostEffects, UserEffects]),
  ],
  declarations: [
    PostListComponent,
    AddPostComponent,
    SinglePostComponent,
    EditPostComponent,
    ReactionButtonCountPipe,
    ReactionButtonsComponent,
    TimeAgoPipe,
    TimeAgoComponent,
    APostComponent,
  ],
  providers: [
    ApiService,
    FeaturesFacadeService,
    ReactionButtonCountPipe,
    TimeAgoPipe,
  ],
})
export class FeaturesModule {
  constructor(private facade: FeaturesFacadeService) {
    // initialize store here
    // so if browser is refreshed are automatically retrieved from the backend.
    // NB look into using metareducer and localstorage.....
  }
}
