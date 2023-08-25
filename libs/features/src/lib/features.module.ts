import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from './lib.routes';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { StoreModule } from '@ngrx/store';
import * as fromFeatures from './+state/features.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FeaturesEffects } from './+state/features.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    StoreModule.forFeature(
      fromFeatures.featuresFeatureKey,
      fromFeatures.reducer
    ),
    EffectsModule.forFeature([FeaturesEffects]),
  ],
  declarations: [
    PostListComponent,
    AddPostComponent,
    SinglePostComponent,
    EditPostComponent,
  ],
})
export class FeaturesModule {}
