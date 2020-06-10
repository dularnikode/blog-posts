import React,{Component} from 'react';
import { Button, Header, Modal ,Form,Icon} from 'semantic-ui-react';
class EditModal extends Component{
  state={open:false}
  closeModal=()=>( this.setState({ open: false }));
  openModel=()=>(this.setState({open:true}));
  onUpdateHandler(event,id){
    this.props.updateHandler(event,id);
    this.closeModal();
  }
  render(){
    const open=this.state.open;
    return(
      <Modal 
        open={open}
        onClose={this.closeModal}
        trigger={<Button basic color='green' onClick={this.openModel}>Edit</Button>} 
        closeIcon
        closeOnDimmerClick>
        <Header content='Edit Post'/>
        <Modal.Content>
            <Form>
                <Form.Input label="Title"   onChange={(event)=>this.props.inputChangedHandler(event,this.props.id)} value={this.props.title} name="title" />
                <Form.Input label="Content"   onChange={(event)=>this.props.inputChangedHandler(event,this.props.id)} value={this.props.content} name="content"/>
                <Form.TextArea label="Description"   onChange={(event)=>this.props.inputChangedHandler(event,this.props.id)} value={this.props.description} name="description"/>
            </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.closeModal}>
            <Icon name='cancel' /> Cancel
          </Button>
          <Button color='green' onClick={(event)=>this.onUpdateHandler(event,this.props.id)}>
            <Icon name='checkmark' /> Update
          </Button>
        </Modal.Actions>
      </Modal>
  );
  }
}
export default EditModal;