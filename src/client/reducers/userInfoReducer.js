import { UPDATE_FIRST_NAME, UPDATE_LAST_NAME, UPDATE_EMAIL, UPDATE_HASH, UPDATE_GENDER, UPDATE_ZIP, UPDATE_WORK_ZIP, UPDATE_BIRTH_DATE, UPDATE_CLOSET_IDS_FOLLOWED, UPDATE_LOGGEDIN} from '../actions/userInfoActions';
import { UPDATE_USER_INFO, UPDATE_AUTHENTICATED} from '../actions/userInfoActions';

const initialState = {
  isAuthenticated: false
};

export function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo
      });
    case UPDATE_AUTHENTICATED:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      });
    default:
      return state;
  }
}
