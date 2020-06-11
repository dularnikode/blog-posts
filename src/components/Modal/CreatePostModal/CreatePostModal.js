import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import { Button, Header, Icon, Modal ,Form} from 'semantic-ui-react';
import classes from './CreatePostModal.module.css';

import * as actionTypes from '../../../Store/Actions/actionTypes';

class CreatePostModal extends Component{
  state={
    open:false,
    redirect:false
  }


  closeModal=()=>( this.setState({ open: false }));

  openModel=(event)=>{
    if(!this.props.isLoggedIn){
        this.setState({redirect:true})
        this.props.onRedirect("login");
    }else{
      this.setState({
        redirect:false,
        open:true
      });
    }
  };

  onSaveHandler(event){
    this.props.postDataHandler(event);
    this.closeModal();
  }
  render(){
    const open =this.state.open;
    let redirect=null;
    if(this.state.redirect){
      redirect=(<Redirect to="login"/>);
    }
  return(
    <div className={classes.Modal}>
    {redirect}
    <Modal 
      open={open}
      onClose={this.closeModal}
      trigger={<Button onClick={this.openModel}>{this.props.isLoggedIn ? "Create New Post":"Login to Create Post"}</Button>} 
      closeIcon
      closeOnDimmerClick  
      >
      <Header content='Create Post'/>
      <Modal.Content>
          <Form>
              <Form.Input name="title" placeholder="Title" onChange={this.props.inputChangedHandler} />
              <Form.Input name="content" placeholder="Content" onChange={this.props.inputChangedHandler}/>
              <Form.TextArea name="description" placeholder="Description" onChange={this.props.inputChangedHandler}/>
          </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={this.closeModal}>
          <Icon name='cancel' /> Cancel
        </Button>
        <Button color='green' onClick={(event)=>this.onSaveHandler(event)}>
          <Icon name='checkmark' /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  </div>
  );
  }
}


const mapDispatchToProps=(dispatch)=>{
  return{
    onRedirect:(redirectTo)=>dispatch({type:actionTypes.CHANGE_ACTIVE_STATE,ActiveState:redirectTo})
  }
}

export default connect(null,mapDispatchToProps)(CreatePostModal);