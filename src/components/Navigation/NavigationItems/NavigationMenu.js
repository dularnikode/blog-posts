import React, { Component } from 'react';
import { Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class NavigationMenu extends Component {
  state = {activeItem:'posts'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    let auth='login';
    if(this.props.isLoggedIn){
      auth='logout';
    }

    return (
      <Menu inverted>
        <Menu.Item as={Link} to='/' header>Blog Post</Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item
            name='posts'
            active={activeItem === 'posts'}
            onClick={this.handleItemClick}
            as={Link} to='/posts' exact
            >Posts</Menu.Item>
            <Menu.Item
            name={auth}
            active={activeItem === auth}
            onClick={this.handleItemClick}
            as={Link} to={auth} exact
            >{this.props.isLoggedIn ? 'Logout' : 'Login'}</Menu.Item>
        </Menu.Menu> 
      </Menu>
    );
  }
}

const  mapStateToProps =state =>{
  return {
      isLoggedIn:state.token !==null
  };
};

export default connect(mapStateToProps)(NavigationMenu);