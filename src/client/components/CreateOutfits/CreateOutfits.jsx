import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Card, Button, Input, Header } from 'semantic-ui-react';
import MyClosetItemsContainer from '../MyCloset/MyClosetItemsContainer.jsx';
import { updateSelectedOutfitItems } from '../../actions/createOutfitsActions.js';
import Axios from 'axios';

export class CreateOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.saveOutfit = this.saveOutfit.bind(this);
    this.clearOutfit = this.clearOutfit.bind(this);
    this.handleOutfitNameChange = this.handleOutfitNameChange.bind(this);

    this.state = {
      outfitName: ''
    };
  }

  onDrop(event) {
    let id = parseInt(event.dataTransfer.getData('id'));
    if (id && !this.props.selectedItems[id]) {
      var newSelectedItems = Object.assign({}, this.props.selectedItems);
      var newItem;
      this.props.allItemsArray.forEach(item => {
        //todo keep an allItemsMap for O(1) lookups
        if (item.id === id) {
          newItem = item;
        }
      });
      newSelectedItems[id] = { url: newItem.url };
      this.props.actions.updateSelectedOutfitItems(newSelectedItems);
    }
  }

  displayOutfit() {
    // let coatItems = [];
    // let topItems = [];
    // let pantsItems = [];
    // let otherItems = [];
    // for (let id in this.props.selectedItems) {
    //   let image = <img key={`outfititem${id}`} src={this.props.selectedItems[id].url} />;
    //   let category = this.props.selectedItems[id].category;
    //   if (category === 'Coats & Jackets') {
    //     coatItems.push(image)
    //   } else if (category === 'Tops') {
    //     topItems.push(image)
    //   } else if (category === 'Pants') {
    //     pantsItems.push(image)
    //   } else {
    //     otherItems.push(image)
    //   }
    // }
    // return coatItems.concat(topItems, pantsItems, otherItems);

    let outfitItems = [];
    for (let id in this.props.selectedItems) {
      outfitItems.push(
        <Grid.Row key={`outfititem${id}`}>
          <img
            src={this.props.selectedItems[id].url}
            style={{ maxHeight: '200px' }}
          />
        </Grid.Row>
      );
    }
    return outfitItems;
  }

  saveOutfit() {
    let itemKeys = Object.keys(this.props.selectedItems);
    if (itemKeys.length === 0) {
      return;
    }
    Axios.post('/api/outfit', {
      items: itemKeys.map(id => ({
        id: parseInt(id)
      })),
      outfitProperties: {
        name: this.state.outfitName,
        isFavorite: false,
        s3PublicUrl: ''
      }
    });
    this.setState({ outfitName: '' });
    this.clearOutfit();
  }

  clearOutfit() {
    this.props.actions.updateSelectedOutfitItems({});
  }

  handleOutfitNameChange(event) {
    this.setState({ outfitName: event.target.value });
  }

  render() {
    return (
      <div>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={6} stretched>
              <Card onDragOver={e => e.preventDefault()} onDrop={this.onDrop}>
                <Card.Content extra>
                  <Button positive onClick={this.saveOutfit}>
                    Save Outfit
                  </Button>
                  <Button negative onClick={this.clearOutfit}>
                    Clear Outfit
                  </Button>
                </Card.Content>
                <Card.Content>
                  <Input
                    fluid
                    placeholder="Outfit Name"
                    value={this.state.outfitName}
                    onChange={this.handleOutfitNameChange}
                  />
                  <Grid padded centered>
                    {Object.keys(this.props.selectedItems).length === 0 ? (
                      <Grid.Row>
                        <Header size="small">Drag items here!</Header>
                      </Grid.Row>
                    ) : (
                      this.displayOutfit()
                    )}
                  </Grid>
                </Card.Content>
                <Card.Content extra>
                  <Button positive onClick={this.saveOutfit}>
                    Save Outfit
                  </Button>
                  <Button negative onClick={this.clearOutfit}>
                    Clear Outfit
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={10}>
              <MyClosetItemsContainer drag />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedItems: state.createOutfits.selectedItems,
    allItemsArray: state.closet.allItemsArray
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateSelectedOutfitItems }, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateOutfits)
);
