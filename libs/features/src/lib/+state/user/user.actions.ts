import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserEntity } from './user.model';

export const UserActions = createActionGroup({
  source: 'Post',
  events: {
    'Intialize Users': emptyProps(),
    'Load Users Success': props<{ users: UserEntity[] }>(),
  },
});
