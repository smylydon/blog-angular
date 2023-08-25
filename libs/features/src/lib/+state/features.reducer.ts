import { createFeature, createReducer, on } from '@ngrx/store';
import { FeaturesActions } from './features.actions';

export const featuresFeatureKey = 'features';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(FeaturesActions.loadFeaturess, (state) => state)
);

export const featuresFeature = createFeature({
  name: featuresFeatureKey,
  reducer,
});
