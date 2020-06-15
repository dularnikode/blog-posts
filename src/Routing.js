import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Route,Switch,Redirect} from 'react-router-dom';

const routeArr=[
  {to:'/posts',path:'./containers/Posts/Posts',showOnAuth:true,showNotAuth:true},
  {to:'/posts/:id',path:'./components/PostDetails/PostDetails',showOnAuth:true,showNotAuth:false},
  {to:'/login',path:'./containers/Login/Login',showOnAuth:true,showNotAuth:true},
  {to:'/logout',path:'./containers/Logout/Logout',showOnAuth:true,showNotAuth:false}  
]


let onAuthRoute=[];
let notAuthRoute=[];


for(let i=0;i<routeArr.length;i++){
  if(routeArr[i].showOnAuth){
    if(routeArr[i].to === '/logout'){
      onAuthRoute.push(<Route key={i} path={routeArr[i].to} render={()=>{const Lazy=React.lazy(()=>(import(`${routeArr[i].path}`)));return(<Lazy/>);}}/>)
    }else{
      onAuthRoute.push(<Route key={i} path={routeArr[i].to} exact render={()=>{const Lazy=React.lazy(()=>(import(`${routeArr[i].path}`)));return(<Lazy/>);}}/>)
    }
  }
  if(routeArr[i].showNotAuth){
    notAuthRoute.push(<Route key={i} path={routeArr[i].to} exact render={()=>{const Lazy=React.lazy(()=>(import(`${routeArr[i].path}`)));return(<Lazy/>);}}/>)
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

