import React,{Component} from 'react';
import Posts from './containers/Posts/Posts';

import {connect} from 'react-redux';
import {Route,Switch,Redirect} from 'react-router-dom';

const LazyLogin = React.lazy(()=>import('./containers/Login/Login'));
const LazyLogout = React.lazy(()=>import('./containers/Logout/Logout'));
const LazyPostDetails = React.lazy(()=>import('./components/PostDetails/PostDetails'));

const onAuthRoute=[
  {to:'/posts',component:Posts},
  {to:'/posts/:id',component:LazyPostDetails},
  {to:'/login',component:LazyLogin},
  {to:'/logout',component:LazyLogout}  
].map((route,index)=><Route key={index} path={route.to} exact component={route.component}/>);

const notAuthRoute=[
  {to:'/login',component:LazyLogin},
  {to:'/posts',component:Posts}
].map((route,index)=><Route key={index} path={route.to} exact component={route.component}/>);

class Routing extends Component{
    render(){
      let routes=(
      <Switch>
        {notAuthRoute}
        <Redirect from="/" to="/posts"/>
      </Switch> 
    );
    if (this.props.isAuthenticated){
      routes=(
        <Switch>
          {onAuthRoute}
        </Switch>
      );
    }
      return(
        <>
          {routes}
        </>
      );
      }
  }
  const mapStateToProps=(state)=>{
    return{
      isAuthenticated:state.auth.token !==null
    };
  };

  export default connect(mapStateToProps)(Routing);

