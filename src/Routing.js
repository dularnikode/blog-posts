import React,{Component} from 'react';
import Posts from './containers/Posts/Posts';

import {connect} from 'react-redux';
import {Route,Switch,Redirect} from 'react-router-dom';

const LazyLogin = React.lazy(()=>import('./containers/Login/Login'));
const LazyLogout = React.lazy(()=>import('./containers/Logout/Logout'));
const LazyPostDetails = React.lazy(()=>import('./components/PostDetails/PostDetails'));
const routeArr=[
  {to:'/posts',component:Posts,showOnAuth:true,showNotAuth:true},
  {to:'/posts/:id',component:LazyPostDetails,showOnAuth:true,showNotAuth:false},
  {to:'/login',component:LazyLogin,showOnAuth:true,showNotAuth:true},
  {to:'/logout',component:LazyLogout,showOnAuth:true,showNotAuth:false}  
]


let onAuthRoute=[];
let notAuthRoute=[];
for(let i=0;i<routeArr.length;i++){
  if(routeArr[i].showOnAuth){
    if(routeArr[i].path==='/logout'){
      onAuthRoute.push(<Route key={i} path={routeArr[i].to} component={routeArr[i].component}/>)
    }else{
      onAuthRoute.push(<Route key={i} path={routeArr[i].to} exact component={routeArr[i].component}/>)
    }
  }
  if(routeArr[i].showNotAuth){
    notAuthRoute.push(<Route key={i} path={routeArr[i].to} exact component={routeArr[i].component}/>)
  }
}

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

