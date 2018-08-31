import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Image, Grid, Button, Header } from 'semantic-ui-react';
import Axios from 'axios';
import { updateAllOutfits } from '../../../actions/myClosetActions';

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.deleteOutfit = this.deleteOutfit.bind(this);
  }

  getItemFromId(id) {
    let items = this.props.allItemsArray;
    for (let i = 0; i < items.length; i++) {
      if (id === items[i].id) {
        return items[i];
      }
    }
    return {};
  }

  deleteOutfit() {
    Axios.delete('/api/outfit', { params: { id: this.props.id } });
    let newOutfits = []
    this.props.allOutfits.forEach(outfit => {
      if(outfit.id !== this.props.id) {
        newOutfits.push(outfit);
      }
    })
    this.props.actions.updateAllOutfits(newOutfits);
  }

  render() {
    let content = (
      <Card.Content>
        <Grid>
          {this.props.itemids.map(id => {
            if (id === null) return '';
            let item = this.getItemFromId(id);
            return (
              <Grid.Column key={`outfit${this.props.id}item${id}`} width={2}>
                <Image src={item.url} alt={item.name} />
              </Grid.Column>
            );
          })}
        </Grid>
      </Card.Content>
    );

    let header = (
      <Card.Header>
        <Grid padded>
          <Grid.Column width={14}>
            <Header>{this.props.name}</Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <Button negative onClick={this.deleteOutfit}>
              Delete Outfit
            </Button>
          </Grid.Column>
        </Grid>
      </Card.Header>
    );

    return (
      <Card fluid>
        {header}
        {content}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    allItemsArray: state.closet.allItemsArray,
    allOutfits: state.closet.allOutfits
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateAllOutfits }, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Outfit)
);
