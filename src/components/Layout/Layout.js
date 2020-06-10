import React, {PureComponent} from 'react';
import classes from './Layout.module.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import {Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';

class Layout extends PureComponent {

    state={
        visible:false,
        screenWidth:null,
        activeItem:''
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount(){
        this.setState({
            screenWidth:window.innerWidth
        });
    }

    screenSizeChangeHandler(){
            let width = window.innerWidth;
            window.addEventListener('resize', ()=>{
               if (window.innerWidth !== width) {
                this.setState({screenWidth:window.innerWidth});
               }
            });
    };
    menuToogleHandler=(event)=>{
        this.setState({ visible: !this.state.visible });
    }
    render () {
        const { activeItem } = this.state;
        let auth='login';
        if(this.props.isAuthenticated){
            auth='logout';
        }
        let menu=(
            <Menu inverted attached="top">
                <Menu.Item inverted="true" secondary="true" onClick={(event)=>this.menuToogleHandler(event)}>
                    <Icon name="sidebar" />Menu
                </Menu.Item>          
            </Menu>
        );
        this.screenSizeChangeHandler();
        if(this.state.screenWidth>600){
            
            menu=(<Navbar/>);
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
                        inverted>
                        <Menu.Item 
                            name='posts'
                            active={activeItem === 'posts'}
                            onClick={this.handleItemClick}
                            as={Link} to='/posts' exact="true">
                            <Icon name='pen square' />
                            Posts
                        </Menu.Item>
                        <Menu.Item 
                            name='auth'
                            active={activeItem === auth}
                            onClick={this.handleItemClick}
                            as={Link} exact="true" to={auth}>
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