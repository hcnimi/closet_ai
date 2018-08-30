/*
* action types
*/
import {SELECTED_ITEMS} from "./myClosetActions";

export const MODAL_DISPLAY_STATE = 'MODAL_DISPLAY_STATE';
export const CURRENTLY_DISPLAYED_ITEM = 'CURRENTLY_DISPLAYED_ITEM';
export const EDIT_ITEM_NAME_TOGGLE = 'EDIT_ITEM_NAME_TOGGLE';
export const EDIT_ITEM_BRAND_TOGGLE = 'EDIT_ITEM_BRAND_TOGGLE';
export const EDIT_ITEM_DESCRIPTION_TOGGLE = 'EDIT_ITEM_DESCRIPTION_TOGGLE';
export const EDIT_ITEM_PRICE_TOGGLE = 'EDIT_ITEM_PRICE_TOGGLE';
export const EDIT_ITEM_STYLE_TOGGLE = 'EDIT_ITEM_STYLE_TOGGLE';
export const EDIT_ITEM_PURCHASE_DATE_TOGGLE = 'EDIT_ITEM_PURCHASE_DATE_TOGGLE';
export const EDIT_ITEM_COLOR_TOGGLE = 'EDIT_ITEM_COLOR_TOGGLE';
export const UPDATE_ITEM_VALUE = 'UPDATE_ITEM_VALUE';
export const TOGGLE_DELETE_BUTTON_STATE = 'TOGGLE_DELETE_BUTTON_STATE';


/*
 * action creators
 */
export function updatedModalState(isModalDisplayed, item) {
  return {
    type: MODAL_DISPLAY_STATE,
    isModalDisplayed,
    item
  };
}

export function toggleItemNameField(value) {
  return {
    type: EDIT_ITEM_NAME_TOGGLE,
    value,
  };
}

export function toggleItemBrandField(value) {
  return {
    type: EDIT_ITEM_BRAND_TOGGLE,
    value,
  };
}

export function toggleItemDescriptionField(value) {
  return {
    type: EDIT_ITEM_DESCRIPTION_TOGGLE,
    value,
  };
}

export function toggleItemPriceField(value) {
  return {
    type: EDIT_ITEM_PRICE_TOGGLE,
    value,
  };
}

export function toggleItemPurchaseDateField(value) {
  return {
    type: EDIT_ITEM_PURCHASE_DATE_TOGGLE,
    value,
  };
}

export function toggleItemStyleField(value) {
  return {
    type: EDIT_ITEM_STYLE_TOGGLE,
    value,
  };
}

export function toggleItemColorField(value) {
  return {
    type: EDIT_ITEM_COLOR_TOGGLE,
    value,
  };
}

function updateItemValueEffect(item) {
  return {
    type: UPDATE_ITEM_VALUE,
    item
  };
}

export function updateItemValue(item) {
  return (dispatch) => {
    dispatch(updateItemValueEffect(item));
    return Promise.resolve();
  };
}

function toggleDeleteButtonStateEffect(value) {
  return {
    type: TOGGLE_DELETE_BUTTON_STATE,
    value,
  };
}

export function toggleDeleteButtonState(value) {
  return (dispatch) => {
    dispatch(toggleDeleteButtonStateEffect(value));
    return Promise.resolve();
  };
}
