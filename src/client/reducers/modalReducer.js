import {
  MODAL_DISPLAY_STATE,
  EDIT_ITEM_NAME_TOGGLE,
  EDIT_ITEM_BRAND_TOGGLE,
  EDIT_ITEM_DESCRIPTION_TOGGLE,
  EDIT_ITEM_PRICE_TOGGLE,
  EDIT_ITEM_PURCHASE_DATE_TOGGLE,
  EDIT_ITEM_COLOR_TOGGLE,
  EDIT_ITEM_STYLE_TOGGLE,
  UPDATE_ITEM_VALUE,
  TOGGLE_DELETE_BUTTON_STATE,
  TOGGLE_SAVE_BUTTON_STATE,
} from '../actions/modalActions';

// TODO: this is temporary, need to figure out what the default state will be
const initialState = {
  isModalDisplayed: false,
  currentModalItem: {},
  nameToggle: false,
  brandToggle: false,
  descriptionToggle: false,
  priceToggle: false,
  purchaseDateToggle: false,
  colorToggle: false,
  styleToggle: false,
  deleteButtonState: false,
  saveButtonState: false,
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_DISPLAY_STATE:
      return Object.assign({}, state, {
        currentModalItem: action.item,
        isModalDisplayed: action.isModalDisplayed,
      });
    case EDIT_ITEM_NAME_TOGGLE:
    return Object.assign({}, state, {
      nameToggle: action.value,
    });
    case EDIT_ITEM_BRAND_TOGGLE:
      return Object.assign({}, state, {
        brandToggle: action.value,
      });
    case EDIT_ITEM_DESCRIPTION_TOGGLE:
      return Object.assign({}, state, {
        descriptionToggle: action.value,
      });
    case EDIT_ITEM_PRICE_TOGGLE:
      return Object.assign({}, state, {
        priceToggle: action.value,
      });
    case EDIT_ITEM_PURCHASE_DATE_TOGGLE:
      return Object.assign({}, state, {
        purchaseDateToggle: action.value,
      });
    case EDIT_ITEM_COLOR_TOGGLE:
      return Object.assign({}, state, {
        colorToggle: action.value,
      });
    case EDIT_ITEM_STYLE_TOGGLE:
      return Object.assign({}, state, {
        styleToggle: action.value,
      });
    case UPDATE_ITEM_VALUE:
      return Object.assign({}, state, {
        currentModalItem: action.item,
      });
    case TOGGLE_DELETE_BUTTON_STATE:
      return Object.assign({}, state, {
        deleteButtonState: action.value
      });
    case TOGGLE_SAVE_BUTTON_STATE:
      return Object.assign({}, state, {
        saveButtonState: action.value
      });
    default:
      return state;
  }
}

