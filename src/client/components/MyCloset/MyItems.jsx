import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import Item from './Item.jsx';
import Slider from "react-slick";
import './styles/carousel.css';
import { bindActionCreators } from "redux";
import { updatedModalState } from "../../actions/modalActions.js";


export class MyItems extends React.Component {
  constructor(props) {
    super(props);
    this.filteredView = this.filteredView.bind(this);
    this.notFilteredView = this.notFilteredView.bind(this);
    this.toggle = this.toggle.bind(this);
}

  filteredView() {
    return (this.props.items) ? (
      <Grid.Row verticalAlign="middle" centered>
        {this.props.items.map((item) => (
          <Grid.Column key={item.id} mobile={16} computer={5} tablet={8} widescreen={5} largeScreen={5}>
            <Item key={item.id}
                  toggle={this.toggle}
                  item={item}
                  drag={this.props.drag}
            />
          </Grid.Column>
        ))}
      </Grid.Row>
    ) : <div>No results for the filters selected</div>
  }

  toggle(item) {
    const copyItem = {...item};
    this.props.actions.updatedModalState(!this.props.isModalDisplayed, copyItem);
  }

  notFilteredView() {
    const categories = Object.keys(this.props.allItems);
    const carouselSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeight: true,
      arrows: true,
      centerMode: false,
      centerPadding: "50px",
      className: 'slides',
    };

    return (
      categories.map((category) => (
        (this.props.items[category]) ?
          <Grid.Row key={`category row ${category}`} verticalAlign="middle" centered>
            <Grid.Column width={16}>
              <h2>{category}</h2>
            </Grid.Column>
            <Grid.Column width={16}>
              <Slider {...carouselSettings} touchMove={!this.props.drag} >
                  {this.props.items[category].map(item  => (
                    <div key={`div ${item.id}`}>
                      <Item isModalDisplayed={this.props.isModalDisplayed}
                            toggle={this.toggle}
                            item={item}
                            drag={this.props.drag}
                      />
                    </div>
                  ))}
              </Slider>
            </Grid.Column>
          </Grid.Row>
          :  null
      ))
    );
  }

  render() {
    const items = this.props.items.length || Object.keys(this.props.items).length;
    return (
        <Grid padded divided='vertically'>
          {(items) ?
            Array.isArray(this.props.items) ? this.filteredView() : this.notFilteredView()
            :
            <h2> No items to show </h2>
          }
        </Grid>
    );
  }
}

MyItems.propTypes  = {
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  allItems: PropTypes.object,
  isModalDisplayed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    selectedSeasons: state.filter.selectedSeasons,
    selectedColors: state.filter.selectedItemColors,
    selectedBrands: state.filter.selectedItemBrands,
    selectedCategories: state.filter.selectedItemCategories,
    isFiltered: state.closet.isFiltered,
    isModalDisplayed: state.item.isModalDisplayed,
    currentModalItem: state.item.currentModalItem,
    allItems: state.closet.allItems,
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updatedModalState,
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyItems));
