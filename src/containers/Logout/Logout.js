import React,{Component} from 'react';
import * as actions from '../../Store/Actions/index';
import {connect} from 'react-redux';

class Logout extends Component {
    
    
    componentDidMount(){
        if(window.confirm("Do you really want to logout ?")){
            this.props.onLogout();
        }else{
            this.props.history.replace('/posts');
        }    
    }
    render(){
        return <div></div>;
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout : ()=>dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);
