import React,{Component} from 'react';
import * as actions from '../../Store/Actions/index';
import {connect} from 'react-redux';

class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
        this.props.history.push('/posts');
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
