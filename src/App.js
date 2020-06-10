import React,{Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actions from  './Store/Actions/index';
import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login';
import Posts from './containers/Posts/Posts';
import Logout from './containers/Logout/Logout';
import PostDetails from  './components/PostDetails/PostDetails';
import { Route,Switch,Redirect,withRouter} from 'react-router-dom';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
    let routes=(
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/posts"  exact component={Posts}/>
        <Redirect from="/" to="/posts"/>
      </Switch> 
    );
    if (this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/posts" exact component={Posts} />
          <Route path="/login" exact component={Login}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path={'/posts/:id'} exact component={PostDetails}/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
  );
}
}

const mapStateToProps=(state)=>{
  return{
    isAuthenticated:state.token !==null
  };
};
const mapDispatchToProps= dispatch =>{
  return {
    onTryAutoSignup: () =>dispatch(actions.authCheckState())
  };
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
