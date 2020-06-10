import React, { Component} from 'react';
import classes from './Layout.module.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import {Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';

class Layout extends Component {

    state={
        visible:false,
        screenWidth:window.innerWidth,
        resize:false,
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.screenWidth !== this.state.screenWidth;
    }

    screenSizeChangeHandler(){
            let width = window.innerWidth;
            window.addEventListener('resize', ()=>{
               if (window.innerWidth !== width) {
                this.setState({screenWidth:window.innerWidth});
               }
            });
    };
    render () {
        let menu=(<Navbar/>);
        this.screenSizeChangeHandler();
        if(this.state.screenWidth<=600){
            menu=(
                <Menu inverted attached="top">
                    <Menu.Item inverted="true" secondary="true" onClick={() => this.setState({ visible: !this.state.visible })} >
                        <Icon name="sidebar" />Menu
                    </Menu.Item>          
                </Menu>
            );
        }
        return (
            <>  
                {menu}
                <Sidebar.Pushable inverted
                    as={Segment}>
                <Sidebar 
                    as={Menu}
                    animation="overlay" 
                    visible={this.state.visible} 
                    icon="labeled" vertical width='thin' 
                    onHide={() => this.setState({ visible:!this.state.visible })}
                    inverted>
                    <Menu.Item as={Link} to='/posts'>
                        <Icon name='pen square' />
                        Posts
                    </Menu.Item>
                    <Menu.Item as={Link} to={this.props.isAuthenticated? '/logout':'/login'}>
                        {this.props.isAuthenticated? 'Logout':'Login'}
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher inverted="true" dimmed={this.state.visible}>
                <Segment textAlign="center">
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </Segment>
                </Sidebar.Pusher>
                </Sidebar.Pushable>
            </>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:state.token !==null,
    }
};
export default connect(mapStateToProps)(Layout);