import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import Axios from 'axios';
import {updateAuthenticated} from '../actions/userInfoActions';
import {bindActionCreators} from 'redux';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Axios.get('/logout')
      .then(response => {
        this.props.actions.updateAuthenticated(false)
        .then(() => {
          this.props.history.push('/login');
        })
      })
      .catch(err => {
        alert('Error logging out');
        console.log('err logout', err);
        this.props.history.push('/login');
      });
  }

  render() {
    let activeItem = window.location.pathname;
    return (
     !this.props.isAuthenticated ?
      (<Menu>
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
        </Menu.Menu>
      </Menu>)
      :
      (<Menu>
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
            onClick={this.handleClick}
            name='logout'
          />
        </Menu.Menu>
      </Menu>)
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.userInfo.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateAuthenticated}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
