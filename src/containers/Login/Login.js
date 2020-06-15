import React,{Component}from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../Shared/Utility';
import * as actions from '../../Store/Actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import * as actionTypes from '../../Store/Actions/actionTypes';

class  Login extends Component{

    state = {
        controls: {
            email: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            password: {
                value: '',
                validation: {
                    required: true,
                },
                valid:false,  
            }
        }
    }

    componentDidMount(){
        this.props.onRefresh("login");
    }
   
    inputChangedHandler=(event)=>{
        const updatedControls = {
            ...this.state.controls,
            [event.target.name]: {
                ...this.state.controls[event.target.name],
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[event.target.name].validation )
            }
        };
        this.setState( { controls: updatedControls } );
    }

    onSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value );
    }

    
    render(){
        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
            <p style={{
                color:'red'
            }}>* {this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect=(<Redirect from="/login" to='/posts'/>);
        }
        let login=(
            <Form size='large' onSubmit={(event)=>this.onSubmitHandler(event)}>
                    <Segment stacked>
                    <Form.Input 
                        fluid icon='user' iconPosition='left' 
                        placeholder='E-mail address'
                        type='email' required
                        name='email'
                        onChange={this.inputChangedHandler}
                    />
                    <Form.Input
                        fluid icon='lock' iconPosition='left'
                        placeholder='Password'
                        name='password'
                        type='password' required
                        onChange={this.inputChangedHandler}
                    />
                    {errorMessage}
                    <Button color='black' fluid size='large'>
                        Login
                    </Button>
                    </Segment>
                </Form>
        );
        if(this.props.isloading){
            login=(<Spinner/>);
        }

        return (
        <>
            <Grid textAlign='center' style={{ height: '550px' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth:450 }}>
                {authRedirect}
                <Header as='h2' color='black' textAlign='center'>
                    Login to your Blog
                </Header>
                {login}
                </Grid.Column>
            </Grid>
        </>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isloading:state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password) => dispatch( actions.login( email, password) ),
        onRefresh:(activeMenu)=>dispatch({type:actionTypes.CHANGE_ACTIVE_STATE,ActiveState:activeMenu})
    };
};


      
export default connect(mapStateToProps,mapDispatchToProps)(Login);