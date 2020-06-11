import React, { Component } from 'react';
import { Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
class NavigationMenu extends Component {
  render() {
     const isActive= this.props.isActiveState
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
            active={isActive === 'posts'}
            onClick={(event)=>this.props.onActiveChange(event,'posts')}
            as={Link} to='/posts' exact="true"
            >Posts</Menu.Item>
            <Menu.Item
            name={auth}
            active={isActive === auth}
            onClick={(event)=>this.props.onActiveChange(event,auth)}
            as={Link} to={auth} exact="true"
            >{this.props.isLoggedIn ? 'Logout' : 'Login'}</Menu.Item>
        </Menu.Menu> 
      </Menu>
    );
  }
}

const  mapStateToProps =state =>{
  return {
      isLoggedIn:state.auth.token !==null,
      isActiveState:state.nav.activeState
  };
};

const mapDispatchToProps=dispatch=>{
  return{
    onActiveChange:(event,stateName)=>dispatch({type:actionTypes.CHANGE_ACTIVE_STATE,ActiveState:stateName})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavigationMenu);