import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FeaturesActions = createActionGroup({
  source: 'Features',
  events: {
    'Load Featuress': emptyProps(),
    
    
  }
});
