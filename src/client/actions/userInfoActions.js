/*
* action types
*/
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_AUTHENTICATED = 'UPDATE_AUTHENTICATED';

/*
 * action creators
 */
export function updateUserInfo(userInfo) {
  return {
    type: UPDATE_USER_INFO,
    userInfo
  };
}

export function updateAuthenticated(isAuthenticated) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: UPDATE_AUTHENTICATED,
        isAuthenticated
      });

      resolve();
    });
  }
}
