import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFeatures from './features.reducer';

export const selectFeaturesState = createFeatureSelector<fromFeatures.State>(
  fromFeatures.featuresFeatureKey
);
