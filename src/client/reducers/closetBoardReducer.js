import {
  UPDATE_RECENTLY_ADDED_OUTFITS,
  UPDATE_WEATHER,
  UPDATE_RECOMMENDED_OUTFITS,
  UPDATE_UNWORN_ITEMS,
} from '../actions/closetBoardActions';

import { WEATHER, LOCATION } from '../actions/closetBoardActions';

const initialState = {
  weather: {},
  location: { error: 'Waiting for location...' },
  recentlyAddedOutfits: [],
  unwornItems: [],
};

export function closetBoardReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_WEATHER:
      return Object.assign({}, state, {
        weather: action.forecast
      });
    case UPDATE_RECENTLY_ADDED_OUTFITS:
      return Object.assign({}, state, {
        recentlyAddedOutfits: action.recentlyAddedOutfits
      });
    case UPDATE_RECOMMENDED_OUTFITS:
      return Object.assign({}, state, {
        recommendedOutfits: action.recommendedOutfits
      });
    case UPDATE_UNWORN_ITEMS:
      return Object.assign({}, state, {
        unwornItems: action.unwornItems
      });
    case LOCATION:
      return Object.assign({}, state, {
        location: action.location
      });
    default:
      return state;
  }
}
