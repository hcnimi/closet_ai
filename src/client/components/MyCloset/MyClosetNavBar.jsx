import { Menu, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const MyClosetNavBar = (props) => (
    <Menu vertical id="myCloset" size="huge" stackable>
      <Menu.Item  >
        <Menu.Header>My Closet</Menu.Header>
        <Menu.Menu>
          {props.closetCategories.map((closetCategory, index) => (
            (index > 0) ?
              <Menu.Item
                id="closetCategory"
                key={closetCategory}
                name={closetCategory}
                disabled={true}
              >
                {closetCategory} {<Label color='teal'>Pro</Label>}
              </Menu.Item>
              :
              <Menu.Item
                id="closetCategory"
                key={closetCategory}
                name={closetCategory}
                active={(props.activeItem === closetCategory)}
                onClick={props.handleItemClick}
              >
                {closetCategory}
              </Menu.Item>

          ))}
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>My Outfits</Menu.Header>
        <Menu.Menu>
          {props.outfitCategories.map((outfitCategory, index) => (
            (index > 0) ?
            <Menu.Item
              id="outfitCategory"
              key={outfitCategory}
              name={outfitCategory}
              disabled={true}
            >
              {outfitCategory} {<Label color='teal'>Pro</Label>}
            </Menu.Item>
              :
              <Menu.Item
                id="outfitCategory"
                key={outfitCategory}
                name={outfitCategory}
                active={(props.activeItem === outfitCategory)}
                onClick={props.handleItemClick}
              >
                {outfitCategory}
              </Menu.Item>
          ))}
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );

MyClosetNavBar.propTypes = {
 activeItem: PropTypes.string,
  onClick: PropTypes.func,
  closetCategory: PropTypes.array,
  outfitCategories: PropTypes.array
};

export default withRouter(MyClosetNavBar);
