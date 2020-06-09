import React,{Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actions from  './Store/Actions/index';
import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login';
import Posts from './containers/Posts/Posts';
import Logout from './containers/Logout/Logout';
import { Route,Switch,Redirect,withRouter} from 'react-router-dom';
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
    let routes=(
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/"  exact component={Posts}/>
        <Redirect to='/'/>
      </Switch> 
    );
    if (this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={Posts} />
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
