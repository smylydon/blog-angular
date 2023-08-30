import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NewPost, Post } from './post.model';
import { Update } from '@ngrx/entity';

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    'Intialize Posts': emptyProps(),
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failure': props<{ error: Error }>(),
    'Save Post': props<{ post: NewPost }>(),
    'Save Post Success': props<{ post: NewPost }>(),
    'Save Post Failure': props<{ error: Error }>(),
    'Update Post': props<{ update: Update<Post> }>(),
  },
});
