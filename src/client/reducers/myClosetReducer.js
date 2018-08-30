import {
  CURRENT_MENU_ITEM,
  SELECTED_ITEMS,
  CLOSET_CATEGORIES,
  OUTFIT_CATEGORIES,
  FILTERED_STATE,
  ALL_ITEMS,
  ALL_OUTFITS,
  ALL_DROPDOWN_INFO
} from '../actions/myClosetActions';

// TODO: this is temporary, need to figure out what the default state will be
const initialState = {
  currentMenuItem: 'All Items',
  allItems: {},
  allItemsArray: [],
  selectedItems: [],
  closetCategories: [],
  outfitCategories: [],
  filteredState: false,
  allOutfits: []
};

export function myClosetReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_ITEMS:
      return Object.assign({}, state, {
        allItems: action.itemsObj,
        allItemsArray: action.itemsArray,
      });
    case CURRENT_MENU_ITEM:
      return Object.assign({}, state, {
        currentMenuItem: action.item,
      });
    case SELECTED_ITEMS:
      return Object.assign({}, state, {
        selectedItems: action.items
      });
    case CLOSET_CATEGORIES:
      return Object.assign({}, state, {
        closetCategories: action.categories
      });
    case OUTFIT_CATEGORIES:
      return Object.assign({}, state, {
        outfitCategories: action.categories
      });
    case FILTERED_STATE:
      return Object.assign({}, state, {
        filteredState: action.isFiltered
      });
    case ALL_OUTFITS:
      return Object.assign({}, state, {
        allOutfits: action.outfits
      }); 
    case ALL_DROPDOWN_INFO:
      return Object.assign({}, state, {
        allColors: action.colors,
        allCategories: action.categories,
        allStyles: action.styles,
      });
    default:
      return state;
  }
}

