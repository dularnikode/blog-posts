import React,{Component}from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../Shared/Utility';
import * as actions from '../../Store/Actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';

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
            authRedirect=(<Redirect to='/'/>);
        }
        let login=(
            <Form size='large' onSubmit={this.onSubmitHandler}>
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
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                {authRedirect}
                <Header as='h2' color='black' textAlign='center'>
                    Login to your Blog
                </Header>
                {login}
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        isAuthenticated: state.token !== null,
        isloading:state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password) => dispatch( actions.login( email, password) )
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);