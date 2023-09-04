import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserEntity } from './user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get Users': emptyProps(),
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: UserEntity[] }>(),
    'Load Users Failure': props<{ error: Error }>(),
  },
});
