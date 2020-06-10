import React,{Component} from 'react';
import { Button, Header, Icon, Modal ,Form} from 'semantic-ui-react';
import classes from './CreatePostModal.module.css';
 class CreatePostModal extends Component{
  state={open:false}
  closeModal=()=>( this.setState({ open: false }));
  openModel=()=>(this.setState({open:true}));


  onSaveHandler(event){
    this.props.postDataHandler(event);
    this.closeModal();
  }
  render(){
    const open=this.state.open;
  return(
    <div className={classes.Modal}>
    <Modal 
      open={open}
      onClose={this.closeModal}
      trigger={<Button onClick={this.openModel}>Create New Post</Button>} 
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

export default CreatePostModal;