import {createAction, props} from '@ngrx/store';
import {UserInfo} from 'firebase';

export const signInEmail = createAction(
  '[Core - Auth] Sign in with email and password.',
  props<{email: string, password: string}>()
);

export const signInGoogle = createAction(
  '[Core - Auth] Sign in with Goole.'
);

// export const signInSuccess = createAction(
export const updateUserInfo = createAction(
  '[Core - Auth] Update User Info.',
  props<{user?: UserInfo}>()
);

export const signout = createAction(
  '[Core - Auth] Sign out.'
);

export const signoutSuccess = createAction(
  '[Core - Auth] Sign out successfully.'
);
