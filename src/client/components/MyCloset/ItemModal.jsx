import React from 'react';
import { Header, Image, Modal, Icon, Input, Button, Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import {
  updatedModalState,
  updateAllItems,
  updateSelectedItems,
} from '../../actions/myClosetActions';
import {
  toggleItemNameField,
  toggleItemBrandField,
  toggleItemDescriptionField,
  toggleItemPriceField,
  toggleItemPurchaseDateField,
  toggleItemColorField,
  toggleItemStyleField,
  updateItemValue,
  toggleDeleteButtonState,
} from '../../actions/modalActions';
import {
  updateItemCategories,
  updateItemColors,
  updateItemBrands,
  updateSelectedColors,
  updateSelectedBrands,
  updateSelectedCategories,
  updateSelectedSeasons
} from '../../actions/myFilterActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {itemSeasonsExample} from "./ExampleData";
import Axios from "axios/index";

class ItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggleItemName=this.toggleItemName.bind(this);
    this.toggleItemBrand=this.toggleItemBrand.bind(this);
    this.toggleItemDescription=this.toggleItemDescription.bind(this);
    this.toggleItemPrice=this.toggleItemPrice.bind(this);
    this.toggleItemPurchaseDate=this.toggleItemPurchaseDate.bind(this);
    this.toggleItemColor=this.toggleItemColor.bind(this);
    this.toggleItemStyle=this.toggleItemStyle.bind(this);
    this.removeItem=this.removeItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.editItem=this.editItem.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.saveItem=this.saveItem.bind(this);
    this.handleResponse=this.handleResponse.bind(this);
    this.handleError=this.handleError.bind(this);
    this.createItemsArray=this.createItemsArray.bind(this);
    this.close=this.close.bind(this);
    this.toggleDeleteButtonState=this.toggleDeleteButtonState.bind(this);
    this.handleDropdownChange=this.handleDropdownChange.bind(this);
  }

  createItemsArray(response) {
    let itemsArray = [];
    for (let key in response.data.items) {
      for(let i = 0; i < response.data.items[key].length; i++) {
        itemsArray.push(response.data.items[key][i]);
      }
    }
    return {response, itemsArray};
  }

  handleResponse(data) {
    this.props.actions.updateItemCategories(data.response.data.categories);
    this.props.actions.updateItemSeasons(data.response.data.seasons);
    this.props.actions.updateItemColors(data.response.data.colors);
    this.props.actions.updateItemBrands(data.response.data.brands);
    this.props.actions.updateAllItems(data.response.data.items, data.itemsArray);
    this.props.actions.updateSelectedItems(data.response.data.items);
  }

  handleError(error) {
    this.props.actions.updateAllItems({});
    this.props.actions.updateSelectedItems([]);
  }

  editItem(item) {
    Axios.post('/edititem', item)
      .then((response) => {
       return this.createItemsArray(response);
      }).then((data) => {
      this.handleResponse(data);
    }).then(() => {
      this.props.actions.updateSelectedSeasons([]);
      this.props.actions.updateSelectedColors([]);
      this.props.actions.updateSelectedCategories([]);
      this.props.actions.updateSelectedBrands([]);
      this.close();
    }).catch((error) => {
      this.handleError(error);
    });
  }

  deleteItem(item) {
    Axios.post('/removeitem', item)
      .then((response) => {
        return this.createItemsArray(response);
      }).then((data) => {
      this.handleResponse(data);
    }).then(() => {
      this.props.actions.updateSelectedSeasons([]);
      this.props.actions.updateSelectedColors([]);
      this.props.actions.updateSelectedCategories([]);
      this.props.actions.updateSelectedBrands([]);
      this.close();
    }).catch((error) => {
      this.handleError(error);
    });
  }

  handleChange(e) {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value || '';
    this.props.actions.updateItemValue(Object.assign(this.props.currentModalItem, {[key]: value}));
  }

  handleDropdownChange(e, data) {
    e.preventDefault();
    this.props.actions.updateItemValue(Object.assign(this.props.currentModalItem, {[data.name]: data.value}));
  }

  toggleItemName() {
    this.props.actions.toggleItemNameField(!this.props.nameToggle);
    //make server call to edit the item
  }

  toggleItemBrand() {
    this.props.actions.toggleItemBrandField(!this.props.brandToggle);
    //make server call to edit the item
  }

  toggleItemDescription() {
    this.props.actions.toggleItemDescriptionField(!this.props.descriptionToggle);
    //make server call to edit the item
  }

  toggleItemPrice() {
    this.props.actions.toggleItemPriceField(!this.props.priceToggle);
    //make server call to edit the item
  }

  toggleItemColor() {
    this.props.actions.toggleItemColorField(!this.props.colorToggle);
    //make server call to edit the item
  }

  toggleItemStyle() {
    this.props.actions.toggleItemStyleField(!this.props.styleToggle);
    //make server call to edit the item
  }

  toggleItemPurchaseDate() {
    this.props.actions.toggleItemPurchaseDateField(!this.props.purchaseDateToggle);
    //make server call to edit the item
  }

  toggleDeleteButtonState() {
    return this.props.actions.toggleDeleteButtonState(!this.props.deleteButtonState);
    //make server call to edit the item
  }

  saveItem() {
    this.editItem(this.props.currentModalItem);
  }

  removeItem(e) {
    e.preventDefault();
    this.toggleDeleteButtonState().then(() => {
      this.deleteItem(this.props.currentModalItem);
    });
  }

  close() {
    this.props.actions.toggleItemNameField(false);
    this.props.actions.toggleItemBrandField(false);
    this.props.actions.toggleItemDescriptionField(false);
    this.props.actions.toggleItemPriceField(false);
    this.props.actions.toggleItemColorField(false);
    this.props.actions.toggleItemStyleField(false);
    this.props.actions.toggleItemPurchaseDateField(false);
    this.props.actions.updatedModalState(false, {});
    this.props.actions.toggleDeleteButtonState(false);
  }


  render() {
      const inlineStyle = {
        modal: {
          margin: '0',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
        },
        deleteButton: {
          position: 'absolute',
          marginLeft: '70%',
          marginTop: '-10%',
        },
        saveButton: {
          position: 'absolute',
          marginLeft: '60%',
          marginTop: '-10%',
        },
      };
    return (
        <Modal
          closeIcon
          centered={false}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.close}
          size='large'
          open={this.props.isModalDisplayed}
          style={inlineStyle.modal}
        >
          <Modal.Header>View/Edit Item</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='large' src={this.props.currentModalItem.url}/>
            <Modal.Description>
              <Header> {(this.props.nameToggle) ?
                <div >Name:
                  <Input
                    name='name'
                    icon={<Icon name='checkmark' link onClick={this.toggleItemName}/>}
                    defaultValue={this.props.currentModalItem.name}
                    onChange={this.handleChange}
                    size='mini'
                  />
                </div> :
                <div>Name: {this.props.currentModalItem.name}
                <Icon link name='edit outline' onClick={this.toggleItemName} size='small'/> </div>}
              </Header>
              <div>{(this.props.brandToggle) ?
                <div>Brand:
                  <Input
                    name='brand'
                    icon={<Icon name='checkmark' link onClick={this.toggleItemBrand}/>}
                    defaultValue={this.props.currentModalItem.brand}
                    onChange={this.handleChange}
                    size='mini'
                  />
                </div> :
                <div>Brand: {this.props.currentModalItem.brand}
                <Icon link name='edit outline' onClick={this.toggleItemBrand} size='small'/> </div>}
              </div>
              <div>{(this.props.colorToggle) ?
                <div>Color:
                  <Dropdown
                    name='colorid'
                    defaultValue={this.props.currentModalItem.colorid}
                    onChange={this.handleDropdownChange}
                    options={this.props.allColors}
                    fluid
                    search
                    selection
                  />
                </div> :
                <div>Color: {this.props.currentModalItem.color}
                <Icon link name='edit outline' onClick={this.toggleItemColor} size='small'/> </div>}
              </div>
              <div>{(this.props.styleToggle) ?
                <div>Style:
                  <Dropdown
                    name='styleid'
                    defaultValue={this.props.currentModalItem.styleid}
                    onChange={this.handleDropdownChange}
                    options={this.props.allStyles}
                    fluid
                    search
                    selection
                   />
                </div> :
                <div>Style: {this.props.currentModalItem.style}
                <Icon link name='edit outline' onClick={this.toggleItemStyle} size='small'/> </div>}
              </div>
              <div>{(this.props.descriptionToggle) ?
                <div>Description:
                  <Input
                    name='description'
                    icon={<Icon name='checkmark' link onClick={this.toggleItemDescription}/>}
                    defaultValue={this.props.currentModalItem.description}
                    onChange={this.handleChange}
                    size='mini'
                  />
                </div> :
                <div>Description: {this.props.currentModalItem.description}
                <Icon link name='edit outline' onClick={this.toggleItemDescription} size='small'/> </div>}
              </div>
              <div>{(this.props.priceToggle) ?
                <div>Price:
                  <Input
                    name='price'
                    icon={<Icon name='checkmark' link onClick={this.toggleItemPrice}/>}
                    defaultValue={this.props.currentModalItem.price}
                    onChange={this.handleChange}
                    size='mini'
                  />
                </div> :
                <div>Price: {this.props.currentModalItem.price}
                <Icon link name='edit outline' onClick={this.toggleItemPrice} size='small'/> </div>}
              </div>
              <div>{(this.props.purchaseDateToggle) ?
                <div>Date purchased:
                  <Input
                    type='date'
                    name='purchasedate'
                    icon={<Icon name='checkmark' link onClick={this.toggleItemPurchaseDate}/>}
                    defaultValue={this.props.currentModalItem.purchasedate}
                    onChange={this.handleChange}
                    size='mini'
                  />
                </div> :
                <div>Date purchased:  {this.props.currentModalItem.purchasedate}
                <Icon link name='edit outline' onClick={this.toggleItemPurchaseDate} size='small'/> </div>}
              </div>
            </Modal.Description>
          </Modal.Content>
          <Button color='green' style={inlineStyle.saveButton} onClick={this.saveItem}>Save</Button>
          <Button
            color='red'
            disabled={this.props.deleteButtonState}
            loading={this.props.deleteButtonState}
            style={inlineStyle.deleteButton}
            onClick={this.removeItem}
          >Delete Item</Button>
        </Modal>
    );
  }
}


ItemModal.propTypes  = {
  isModalDisplayed: PropTypes.bool.isRequired,
  nameToggle: PropTypes.bool.isRequired,
  brandToggle: PropTypes.bool.isRequired,
  descriptionToggle: PropTypes.bool.isRequired,
  priceToggle: PropTypes.bool.isRequired,
  purchaseDateToggle: PropTypes.bool.isRequired,
  styleToggle: PropTypes.bool.isRequired,
  colorToggle: PropTypes.bool.isRequired,
  deleteButtonState: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    isModalDisplayed: state.item.isModalDisplayed,
    currentModalItem: state.item.currentModalItem,
    nameToggle: state.item.nameToggle,
    brandToggle: state.item.brandToggle,
    descriptionToggle: state.item.descriptionToggle,
    priceToggle: state.item.priceToggle,
    purchaseDateToggle: state.item.purchaseDateToggle,
    styleToggle: state.item.styleToggle,
    colorToggle: state.item.colorToggle,
    allStyles: state.closet.allStyles,
    allColors: state.closet.allColors,
    allCategories: state.closet.allCategories,
    deleteButtonState: state.item.deleteButtonState,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updatedModalState,
    toggleItemNameField,
    toggleItemBrandField,
    toggleItemDescriptionField,
    toggleItemPriceField,
    toggleItemPurchaseDateField,
    toggleItemColorField,
    toggleItemStyleField,
    toggleDeleteButtonState,
    updateItemValue,
    updateAllItems,
    updateSelectedItems,
    updateItemCategories,
    updateItemColors,
    updateItemBrands,
    updateSelectedColors,
    updateSelectedBrands,
    updateSelectedCategories,
    updateSelectedSeasons,
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemModal));


