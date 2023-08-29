import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NewPost, PostEntity } from './post.model';

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    'Intialize Posts': emptyProps(),
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: PostEntity[] }>(),
    'Load Posts Failure': props<{ error: Error }>(),
    'Save Post': props<{ post: NewPost }>(),
    'Save Post Success': props<{ post: NewPost }>(),
    'Save Post Failure': props<{ error: Error }>(),
  },
});
