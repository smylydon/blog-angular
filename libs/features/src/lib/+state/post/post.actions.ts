import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PostEntity } from './post.model';

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    'Intialize posts': emptyProps(),
    'Load Posts Success': props<{ posts: PostEntity[] }>(),
  },
});
