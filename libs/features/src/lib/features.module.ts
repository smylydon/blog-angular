import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromPosts from './+state/post/post.reducer';
import * as fromUsers from './+state/user/user.reducer';
import { PostEffects } from './+state/post/post.effects';
import { UserEffects } from './+state/user/user.effects';

import { FeaturesRoutingModule } from './features.routes';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactionButtonCountPipe } from './pipes/reaction-button-count.pipe';
import { ReactionButtonsComponent } from './reaction-buttons/reaction-buttons.component';

import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TimeAgoComponent } from './time-ago/time-ago.component';
import { FeaturesFacadeService } from './+state/features-facade.service';
import { ApiService } from './services/api.service';

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
    ReactionButtonCountPipe,
    ReactionButtonsComponent,
    TimeAgoPipe,
    TimeAgoComponent,
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
