import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => {
  let activeItem = window.location.pathname;

  //todo: conditionally render signup/login/logout depending on state
  return (
    <Menu>
      <Menu.Item
        as={Link}
        to='/closetboard'
        name='Closet Board'
        active={activeItem === '/closetboard'}
      />
      <Menu.Item
        as={Link}
        to='/mycloset'
        name='My Closet'
        active={activeItem === '/mycloset'}
      />
      <Menu.Item
        as={Link}
        to='/calendar'
        name='Calendar'
        active={activeItem === '/calendar'}
      />
      <Menu.Item
        as={Link}
        to='/createoutfits'
        name='Create Outfits'
        active={activeItem === '/createoutfits'}
      />
      <Menu.Item
        as={Link}
        to='/additem'
        name='Add Item'
        active={activeItem === '/additem'}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          as={Link}
          to='/signup'
          name='Signup'
        />
        <Menu.Item
          as={Link}
          to='/login'
          name='login'
        />
        <Menu.Item
          as={Link}
          to='/logout'
          name='logout'
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Header
