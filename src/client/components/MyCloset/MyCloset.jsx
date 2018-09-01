import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'semantic-ui-react';
import { outfitCategoriesExample, closetCategoriesExample } from './ExampleData';
import {
  updateSelectedMenuItem,
  updateClosetCategories,
  updateOutfitCategories
  } from '../../actions/myClosetActions';
import MyClosetNavBar from './MyClosetNavBar.jsx';
import MyClosetItemsContainer from './MyClosetItemsContainer.jsx';
import OutfitsContainer from '../common/OutfitsContainer/OutfitsContainer.jsx';


export class MyCloset extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick=this.handleItemClick.bind(this);
  }

  handleItemClick(e, item) {
    const { name } = item;
    this.props.actions.updateSelectedMenuItem(name);
  }

  componentDidMount() {
    //getCategories from DB
    //TODO: get these from db once we have that setup
    //MOCK DATA
    this.props.actions.updateClosetCategories(closetCategoriesExample);
    this.props.actions.updateOutfitCategories(outfitCategoriesExample);
  }

  render() {
   const activeItem = this.props.currentMenuItem || 'All Items';

    return (
      <div>
        <Grid padded>
          <Grid.Row centered>
            <Grid.Column mobile={16} computer={16} tablet={16} widescreen={4} largeScreen={4}>
              <MyClosetNavBar
                id="navBar"
                handleItemClick={this.handleItemClick}
                activeItem={activeItem}
                closetCategories={this.props.closetCategories || [] }
                outfitCategories={this.props.outfitCategories || []}
              />
            </Grid.Column>
            <Grid.Column mobile={16} computer={16} tablet={16} widescreen={12} largeScreen={12}>
              {this.props.currentMenuItem.includes('Outfit')
                ? <OutfitsContainer />
                : <MyClosetItemsContainer/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    currentMenuItem: state.closet.currentMenuItem,
    closetCategories: state.closet.closetCategories,
    outfitCategories: state.closet.outfitCategories
  });
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateSelectedMenuItem,
    updateClosetCategories,
    updateOutfitCategories
    },
    dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCloset))
