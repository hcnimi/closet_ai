import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import Outfit from './Outfit.jsx';
import { updateAllOutfits } from '../../../actions/myClosetActions';

class OutfitsContainer extends React.Component {
  componentDidMount() {
    Axios.get('/getoutfits').then(response => {
      this.props.actions.updateAllOutfits(response.data);
    });
  }

  render() {
    return (
      <div>
        {this.props.allOutfits.map(outfit => (
          <Outfit key={'outfit' + outfit.id} {...outfit} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    allItemsArray: state.closet.allItemsArray,
    allOutfits: state.closet.allOutfits
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateAllOutfits }, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutfitsContainer)
);
