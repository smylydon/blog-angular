import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NewPost, Post } from './post.model';
import { Update } from '@ngrx/entity';

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    'Get Posts': emptyProps(),
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failure': props<{ error: Error }>(),
    'Save Post': props<{ post: NewPost }>(),
    'Save Post Success': props<{ post: Post }>(),
    'Save Post Failure': props<{ error: Error }>(),
    'Update Post': props<{ update: Update<Post> }>(),
    'Update Post Success': props<{ update: Update<Post> }>(),
    'Update Post Failure': props<{ error: Error }>(),
    'Update Reaction': props<{ update: Update<Post> }>(),
    'Delete Post': props<{ post_id: number }>(),
    'Delete Post Success': props<{ post_id: number }>(),
    'Delete Post Failure': props<{ error: Error }>(),
  },
});
