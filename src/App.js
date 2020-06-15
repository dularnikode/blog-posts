import React,{Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import * as actions from  './Store/Actions/index';
import Layout from './components/Layout/Layout';

import Routing from './Routing';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){ 
    return (
      <div>
        <Layout>
          <Routing/>
        </Layout>
      </div>
  );
  }
}

const mapDispatchToProps= dispatch =>{
  return {
    onTryAutoSignup: () =>dispatch(actions.authCheckState())
  };
};


export default connect(null,mapDispatchToProps)(App);
