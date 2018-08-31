import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Image, Grid, Button, Header } from 'semantic-ui-react';

class Outfit extends React.Component {
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
    console.log('TODO delete outfit from db');
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
    allItemsArray: state.closet.allItemsArray
  };
};

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Outfit)
);
